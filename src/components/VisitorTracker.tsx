'use client';

import { useVisitorTracker } from '@/hooks/useVisitorTracker';

/**
 * Client component ที่ mount ใน layout เพื่อ track ทุกหน้า
 * ไม่ render อะไรบน UI เลย — แค่ side-effect เท่านั้น
 */
export function VisitorTracker() {
  useVisitorTracker();
  return null;
}
