import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const ONLINE_KEY_PREFIX = 'visitor:online:';
const RATE_LIMIT_KEY = 'visitor:email:last_sent';
const ONLINE_TTL = 5 * 60;        // 5 minutes
const RATE_LIMIT_SECONDS = 5 * 60; // 5 minutes

function getOnlineKey(sessionId: string) {
  return `${ONLINE_KEY_PREFIX}${sessionId}`;
}

function formatThaiTime(date: Date): string {
  return date.toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/** แปลง country code ("TH") เป็น flag emoji ("🇹🇭") */
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

async function getOnlineCount(): Promise<number> {
  const keys = await redis.keys(`${ONLINE_KEY_PREFIX}*`);
  return keys.length;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId } = body as { sessionId?: string };

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
    }

    // Register/refresh this session as online (TTL 5 min)
    await redis.set(getOnlineKey(sessionId), '1', { ex: ONLINE_TTL });

    // Get current online count
    const onlineCount = await getOnlineCount();

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

      // Fallback: ถ้าไม่มี Vercel headers → ใช้ ip-api.com (ฟรี ไม่ต้องมี key)
      if (!city || !country) {
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

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.NOTIFY_EMAIL!,
        subject: `มีผู้เข้าชม Portfolio ของคุณ ${onlineCount} คน`,
        text: `เวลา: ${thaiTime}${locationLine}`,
      });
    }

    return NextResponse.json({ onlineCount, emailSent: shouldSendEmail });
  } catch (error) {
    console.error('[visitor/ping] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
