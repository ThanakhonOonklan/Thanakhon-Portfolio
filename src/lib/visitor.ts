import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

export const ONLINE_KEY_PREFIX = 'visitor:online:';

/** sessionId is generated client-side as `<timestamp>-<random>`; reject anything else. */
const SESSION_ID_RE = /^[A-Za-z0-9-]{8,64}$/;

export function isValidSessionId(value: unknown): value is string {
  return typeof value === 'string' && SESSION_ID_RE.test(value);
}

let redisClient: Redis | null | undefined;
let resendClient: Resend | null | undefined;

/** Returns null (instead of crashing at import time) when env vars are missing. */
export function getRedis(): Redis | null {
  if (redisClient === undefined) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    redisClient = url && token ? new Redis({ url, token }) : null;
  }
  return redisClient;
}

export function getResend(): Resend | null {
  if (resendClient === undefined) {
    const key = process.env.RESEND_API_KEY;
    resendClient = key ? new Resend(key) : null;
  }
  return resendClient;
}

/** Counts online sessions with SCAN (non-blocking) instead of KEYS. */
export async function countOnline(redis: Redis): Promise<number> {
  let cursor = '0';
  let total = 0;
  do {
    const [next, keys] = await redis.scan(cursor, {
      match: `${ONLINE_KEY_PREFIX}*`,
      count: 200,
    });
    total += keys.length;
    cursor = String(next);
  } while (cursor !== '0');
  return total;
}

export function formatThaiTime(date: Date): string {
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

/** Best-effort client IP (Vercel sets x-forwarded-for / x-real-ip). */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Fixed-window rate limit using INCR + EXPIRE (no extra dependency).
 * Returns true when the request is allowed.
 */
export async function allowRequest(
  redis: Redis,
  bucket: string,
  ip: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const key = `ratelimit:${bucket}:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSeconds);
  return count <= limit;
}

export const tooManyRequests = () =>
  new Response(JSON.stringify({ error: 'Too many requests' }), {
    status: 429,
    headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
  });
