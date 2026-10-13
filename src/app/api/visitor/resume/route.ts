import { NextResponse } from 'next/server';
import {
  allowRequest,
  formatThaiTime,
  getClientIp,
  getRedis,
  getResend,
  tooManyRequests,
} from '@/lib/visitor';

const RATE_LIMIT_KEY = 'visitor:resume:last_sent';
const RATE_LIMIT_SECONDS = 5 * 60; // 5 minutes

export async function POST(request: Request) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

    if (!(await allowRequest(redis, 'resume', getClientIp(request), 10, 600))) {
      return tooManyRequests();
    }

    const lastSent = await redis.get<number>(RATE_LIMIT_KEY);
    const now = Date.now();
    const shouldSend = !lastSent || now - Number(lastSent) > RATE_LIMIT_SECONDS * 1000;

    if (shouldSend) {
      await redis.set(RATE_LIMIT_KEY, now, { ex: RATE_LIMIT_SECONDS });

      const thaiTime = formatThaiTime(new Date());

      const resend = getResend();
      const notifyEmail = process.env.NOTIFY_EMAIL;
      if (resend && notifyEmail) {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: notifyEmail,
          subject: `มีการดาวน์โหลด Resume`,
          text: `เวลา: ${thaiTime}`,
        });
      }
    }

    return NextResponse.json({ success: true, emailSent: shouldSend });
  } catch (error) {
    console.error('[visitor/resume] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
