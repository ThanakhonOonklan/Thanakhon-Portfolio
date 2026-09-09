import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants';

export const metadata: Metadata = {
  title: 'Technical Projects | Thanakhon Oonklan',
  description: 'A complete collection of technical projects by Thanakhon Oonklan — web applications, IoT systems, and engineering work.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
