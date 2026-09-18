import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const RATE_LIMIT_KEY = 'visitor:resume:last_sent';
const RATE_LIMIT_SECONDS = 5 * 60; // 5 minutes

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

export async function POST() {
  try {
    const lastSent = await redis.get<number>(RATE_LIMIT_KEY);
    const now = Date.now();
    const shouldSend = !lastSent || now - Number(lastSent) > RATE_LIMIT_SECONDS * 1000;

    if (shouldSend) {
      await redis.set(RATE_LIMIT_KEY, now, { ex: RATE_LIMIT_SECONDS });

      const thaiTime = formatThaiTime(new Date());

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.NOTIFY_EMAIL!,
        subject: `มีการดาวน์โหลด Resume`,
        text: `เวลา: ${thaiTime}`,
      });
    }

    return NextResponse.json({ success: true, emailSent: shouldSend });
  } catch (error) {
    console.error('[visitor/resume] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
