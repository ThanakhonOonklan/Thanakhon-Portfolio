'use client';

import { useEffect, useRef } from 'react';

const HEARTBEAT_MS = 2 * 60 * 1000; // ส่ง heartbeat ทุก 2 นาที

function getSessionId(): string {
  const SESSION_KEY = 'portfolio_visitor_sid';
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

async function pingVisitor(sessionId: string) {
  try {
    await fetch('/api/visitor/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
  } catch {
    // Silent fail — ไม่ให้กระทบ UX หลัก
  }
}

export function useVisitorTracker() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();

    // Ping ครั้งแรกทันที
    pingVisitor(sessionId);

    // Heartbeat ทุก 2 นาที เพื่อรักษา "online" status ใน Redis (TTL 5 นาที)
    intervalRef.current = setInterval(() => {
      pingVisitor(sessionId);
    }, HEARTBEAT_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
