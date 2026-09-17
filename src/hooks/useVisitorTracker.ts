'use client';

import { useEffect, useRef } from 'react';

const HEARTBEAT_MS = 2 * 60 * 1000; // ส่ง heartbeat ทุก 2 นาที
const SESSION_KEY = 'portfolio_visitor_sid';

function getSessionId(): string {
  // ป้องกัน SSR crash — sessionStorage ใช้ได้แค่ฝั่ง client เท่านั้น
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

async function pingVisitor(sessionId: string) {
  if (!sessionId) return;
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

/**
 * ส่ง leave signal ด้วย sendBeacon (browser API ที่ทำงานแม้กำลังปิด tab)
 * sendBeacon ส่ง Content-Type: text/plain อัตโนมัติเมื่อ body เป็น string
 * → leave route ต้องรองรับ text/plain ด้วย (ทำไปแล้ว)
 */
function sendLeave(sessionId: string) {
  if (!sessionId || typeof navigator === 'undefined') return;
  // ใช้ Blob กำหนด content-type เป็น application/json เพื่อให้ route parse ง่ายขึ้น
  const blob = new Blob([JSON.stringify({ sessionId })], {
    type: 'application/json',
  });
  const beaconSent = navigator.sendBeacon('/api/visitor/leave', blob);
  if (!beaconSent) {
    // Fallback: sendBeacon failed (queue เต็ม) → ใช้ fetch + keepalive
    fetch('/api/visitor/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
      keepalive: true,
    }).catch(() => {});
  }
}

export function useVisitorTracker() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // เก็บ sessionId ใน ref เพื่อให้ event handler ล่าสุดเสมอเข้าถึงได้
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    const sessionId = getSessionId();
    if (!sessionId) return; // ป้องกัน SSR
    sessionIdRef.current = sessionId;

    // Ping ครั้งแรกทันที
    pingVisitor(sessionId);

    // Heartbeat ทุก 2 นาที เพื่อรักษา "online" status ใน Redis (TTL 5 นาที)
    intervalRef.current = setInterval(() => {
      pingVisitor(sessionIdRef.current);
    }, HEARTBEAT_MS);

    // ─── Real-time Leave Detection ────────────────────────────────────────
    // visibilitychange: switch tab / minimize window / lock screen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendLeave(sessionIdRef.current);
        // หยุด heartbeat ขณะที่ tab ถูกซ่อน — ประหยัด Redis requests
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (document.visibilityState === 'visible') {
        // User กลับมา → ping ใหม่ + เริ่ม heartbeat อีกครั้ง
        pingVisitor(sessionIdRef.current);
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            pingVisitor(sessionIdRef.current);
          }, HEARTBEAT_MS);
        }
      }
    };

    // pagehide: ปิด tab / navigate ออก / reload (แม่นกว่า beforeunload บน mobile)
    const handlePageHide = () => {
      sendLeave(sessionIdRef.current);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []); // [] ถูกต้อง — ต้องการ register แค่ครั้งเดียวตลอด lifetime ของ component
}
