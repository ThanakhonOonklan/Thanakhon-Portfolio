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
const ONLINE_TTL = 5 * 60; // 5 minutes (seconds)
const RATE_LIMIT_SECONDS = 30 * 60; // 30 minutes

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
      // ✅ Set rate limit key ก่อนส่งเมล เพื่อป้องกัน race condition
      // (ถ้า 2 request มาพร้อมกัน จะได้ไม่ส่งเมล 2 ครั้ง)
      await redis.set(RATE_LIMIT_KEY, now, { ex: RATE_LIMIT_SECONDS });


      const thaiTime = formatThaiTime(new Date());

      // Send notification email
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.NOTIFY_EMAIL!,
        subject: `📊 มีคนเข้าชม Portfolio ของคุณ — ${thaiTime}`,
        html: `
          <!DOCTYPE html>
          <html lang="th">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="520" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;max-width:520px;width:100%;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:36px 40px 28px;text-align:center;">
                        <div style="font-size:40px;margin-bottom:12px;">👀</div>
                        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">มีคนเข้าชม Portfolio</h1>
                        <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Thanakhon Oonklan — Portfolio Visitor Alert</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:32px 40px;">

                        <!-- Stats Row -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                          <tr>
                            <td width="50%" style="padding-right:8px;">
                              <div style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;text-align:center;">
                                <div style="font-size:32px;font-weight:800;color:#3b82f6;margin-bottom:4px;">${onlineCount}</div>
                                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Online ตอนนี้</div>
                              </div>
                            </td>
                            <td width="50%" style="padding-left:8px;">
                              <div style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;text-align:center;">
                                <div style="font-size:14px;font-weight:600;color:#10b981;margin-bottom:4px;">🟢 Active</div>
                                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">สถานะ</div>
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Time Info -->
                        <div style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin-bottom:24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:6px 0;border-bottom:1px solid #222;">
                                <span style="color:#64748b;font-size:13px;">🕐 เวลา</span>
                                <span style="color:#e2e8f0;font-size:13px;float:right;font-weight:500;">${thaiTime}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;">
                                <span style="color:#64748b;font-size:13px;">🌐 Site</span>
                                <span style="color:#3b82f6;font-size:13px;float:right;font-weight:500;">thanakhon-portfolio.vercel.app</span>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- CTA -->
                        <div style="text-align:center;margin-bottom:8px;">
                          <a href="https://thanakhon-portfolio.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;letter-spacing:0.3px;">
                            ดู Portfolio →
                          </a>
                        </div>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color:#0d0d0d;padding:16px 40px;text-align:center;border-top:1px solid #1a1a1a;">
                        <p style="margin:0;color:#374151;font-size:12px;">
                          ส่งโดยอัตโนมัติ · Rate limit 1 เมล / 30 นาที<br/>
                          <span style="color:#1f2937;">thanakhon-portfolio visitor tracker</span>
                        </p>
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
