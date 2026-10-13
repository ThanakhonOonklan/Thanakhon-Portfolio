import { NextResponse } from 'next/server';
import { getRedis, isValidSessionId, ONLINE_KEY_PREFIX } from '@/lib/visitor';

/** รองรับทั้ง application/json และ text/plain (จาก sendBeacon string)
 *  และ application/json จาก sendBeacon Blob */
async function parseSessionId(request: Request): Promise<string | null> {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      return isValidSessionId(body?.sessionId) ? body.sessionId : null;
    }

    // text/plain หรืออื่น ๆ — parse เป็น JSON เอง
    const raw = await request.text();
    const parsed = JSON.parse(raw);
    return isValidSessionId(parsed?.sessionId) ? parsed.sessionId : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

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
