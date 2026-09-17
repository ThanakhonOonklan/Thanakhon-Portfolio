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
const ONLINE_TTL = 5 * 60;        // 5 minutes (seconds)
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

    // Check rate limit — has an email been sent recently?
    const lastSent = await redis.get<number>(RATE_LIMIT_KEY);
    const now = Date.now();
    const shouldSendEmail = !lastSent || now - Number(lastSent) > RATE_LIMIT_SECONDS * 1000;

    if (shouldSendEmail) {
      // Set rate limit key before sending email to prevent race condition
      await redis.set(RATE_LIMIT_KEY, now, { ex: RATE_LIMIT_SECONDS });

      const thaiTime = formatThaiTime(new Date());

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.NOTIFY_EMAIL!,
        subject: `[Portfolio] มีผู้เข้าชม — ${thaiTime}`,
        html: `
          <!DOCTYPE html>
          <html lang="th">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:32px 16px;">
              <tr>
                <td align="center">
                  <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #e0e0e0;max-width:480px;width:100%;">

                    <!-- Header -->
                    <tr>
                      <td style="background-color:#1a1a1a;padding:16px 28px;">
                        <p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:0.5px;">PORTFOLIO VISITOR ALERT</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:28px;">

                        <p style="margin:0 0 20px 0;font-size:15px;color:#111111;line-height:1.6;">
                          มีผู้เข้าชม Portfolio ของคุณ
                        </p>

                        <!-- Info rows -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;margin-bottom:24px;">
                          <tr>
                            <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0;background-color:#fafafa;">
                              <span style="font-size:12px;color:#888888;display:block;margin-bottom:2px;">เวลา</span>
                              <span style="font-size:14px;color:#111111;">${thaiTime}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0;">
                              <span style="font-size:12px;color:#888888;display:block;margin-bottom:2px;">ผู้ใช้ที่ Online อยู่ในขณะนี้</span>
                              <span style="font-size:14px;color:#111111;">${onlineCount} คน</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 14px;background-color:#fafafa;">
                              <span style="font-size:12px;color:#888888;display:block;margin-bottom:2px;">เว็บไซต์</span>
                              <a href="https://thanakhon-portfolio.vercel.app" style="font-size:14px;color:#1a1a1a;text-decoration:none;">thanakhon-portfolio.vercel.app</a>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
    }

    return NextResponse.json({ onlineCount, emailSent: shouldSendEmail });
  } catch (error) {
    console.error('[visitor/ping] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
