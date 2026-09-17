import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ONLINE_KEY_PREFIX = 'visitor:online:';

/** รองรับทั้ง application/json และ text/plain (จาก sendBeacon string)
 *  และ application/json จาก sendBeacon Blob */
async function parseSessionId(request: Request): Promise<string | null> {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let raw: string;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      return typeof body?.sessionId === 'string' ? body.sessionId : null;
    }

    // text/plain หรืออื่น ๆ — parse เป็น JSON เอง
    raw = await request.text();
    const parsed = JSON.parse(raw);
    return typeof parsed?.sessionId === 'string' ? parsed.sessionId : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = await parseSessionId(request);

    if (!sessionId) {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
    }

    // ลบ session ออกจาก Redis ทันทีเมื่อ user ออก
    await redis.del(`${ONLINE_KEY_PREFIX}${sessionId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[visitor/leave] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
