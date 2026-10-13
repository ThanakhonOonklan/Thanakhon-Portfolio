import { NextResponse } from 'next/server';
import {
  allowRequest,
  countOnline,
  formatThaiTime,
  getClientIp,
  getRedis,
  getResend,
  isValidSessionId,
  ONLINE_KEY_PREFIX,
  tooManyRequests,
} from '@/lib/visitor';

const RATE_LIMIT_KEY = 'visitor:email:last_sent';
const ONLINE_TTL = 5 * 60;        // 5 minutes
const RATE_LIMIT_SECONDS = 5 * 60; // 5 minutes

function getOnlineKey(sessionId: string) {
  return `${ONLINE_KEY_PREFIX}${sessionId}`;
}

/** แปลง country code ("TH") เป็น flag emoji ("🇹🇭") */
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

export async function POST(request: Request) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

    if (!(await allowRequest(redis, 'ping', getClientIp(request), 20, 60))) {
      return tooManyRequests();
    }

    const body = await request.json();
    const { sessionId } = body as { sessionId?: unknown };

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
    }

    // Register/refresh this session as online (TTL 5 min)
    await redis.set(getOnlineKey(sessionId), '1', { ex: ONLINE_TTL });

    // Get current online count
    const onlineCount = await countOnline(redis);

    // Check rate limit
    const lastSent = await redis.get<number>(RATE_LIMIT_KEY);
    const now = Date.now();
    const shouldSendEmail = !lastSent || now - Number(lastSent) > RATE_LIMIT_SECONDS * 1000;

    if (shouldSendEmail) {
      await redis.set(RATE_LIMIT_KEY, now, { ex: RATE_LIMIT_SECONDS });

      const thaiTime = formatThaiTime(new Date());

      // อ่าน geo จาก Vercel headers ก่อน (production)
      let city = request.headers.get('x-vercel-ip-city')
        ? decodeURIComponent(request.headers.get('x-vercel-ip-city')!)
        : null;
      let country = request.headers.get('x-vercel-ip-country');

      // Dev-only fallback: ip-api.com (HTTP only, would leak visitor IPs in production)
      if ((!city || !country) && process.env.NODE_ENV !== 'production') {
        try {
          const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            '';
          if (ip && ip !== '::1' && ip !== '127.0.0.1') {
            const geo = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,countryCode&lang=en`)
              .then((r) => r.json());
            if (geo.city) city = geo.city;
            if (geo.countryCode) country = geo.countryCode;
          }
        } catch {
          // Silent fail — geo ไม่สำคัญพอที่จะทำให้เมลไม่ส่ง
        }
      }

      const locationLine = city && country
        ? `\nจาก: ${city}, ${country} ${countryFlag(country)}`
        : '';

      const resend = getResend();
      const notifyEmail = process.env.NOTIFY_EMAIL;
      if (resend && notifyEmail) {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: notifyEmail,
        subject: `มีผู้เข้าชม Portfolio ของคุณ ${onlineCount} คน`,
        text: `เวลา: ${thaiTime}${locationLine}`,
        });
      }
    }

    return NextResponse.json({ onlineCount, emailSent: shouldSendEmail });
  } catch (error) {
    console.error('[visitor/ping] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
