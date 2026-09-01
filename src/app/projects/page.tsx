'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout';
import { TechIcon } from '@/components/projects/TechIcon';
import { useLocale } from '@/hooks';

interface ArchiveProject {
  id: number;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  category: string;
  year: string;
  techStack: string[];
  githubUrl: string;
}

const archiveProjects: ArchiveProject[] = [
  {
    id: 1,
    title: 'RalphGuard',
    titleTh: 'RalphGuard',
    description: 'In-silico irritation and toxicity risk screening platform for reducing animal testing dependency, with interactive formula builder and 3D anatomy visualization.',
    descriptionTh: 'ระบบประเมินความเสี่ยงการระคายเคืองและความเป็นพิษของสารเคมีด้วยแบบจำลองคอมพิวเตอร์ (in-silico) เพื่อลดการทดลองในสัตว์ พร้อม Formula Builder และ 3D Anatomy Visualization',
    category: 'AI & WEB APPLICATION',
    year: '2026',
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Three.js',
      'FastAPI',
      'Python',
      'Scikit-learn',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Vercel',
    ],
    githubUrl: 'https://github.com/ThanakhonOonklan/ralphguard',
  },
  {
    id: 2,
    title: 'Thinking Skills Games for Kids',
    titleTh: 'เกมพัฒนาทักษะการคิดสำหรับเด็ก',
    description: 'A web-based interactive educational gaming platform for kids designed to develop analytical thinking, problem-solving, and logical reasoning skills through 7 mini-games.',
    descriptionTh: 'แพลตฟอร์มเกมการศึกษาแบบ Interactive บนเว็บ สำหรับเด็ก พัฒนาทักษะการคิดวิเคราะห์ และการแก้ปัญหาผ่านมินิเกม 7 รูปแบบ',
    category: 'WEB APPLICATION',
    year: '2026',
    techStack: [
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/ThanakhonOonklan/pbit-nongbrite-project-Frontend_2',
  },
  {
    id: 3,
    title: 'IoT Equipment System',
    titleTh: 'ระบบยืม-คืนอุปกรณ์ IoT',
    description: 'Full-stack IoT equipment borrowing and returning web application with real-time status tracking, user management, and administrative dashboard.',
    descriptionTh: 'ระบบยืม-คืนอุปกรณ์ IoT แบบ Web Application พร้อมติดตามสถานะแบบ Real-time และระบบจัดการผู้ใช้งาน',
    category: 'FULL STACK',
    year: '2025',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL', 'Supabase', 'Vercel'],
    githubUrl: 'https://github.com/ThanakhonOonklan/iot_equipment_system',
  },
  {
    id: 4,
    title: 'Gym Management System',
    titleTh: 'ระบบจัดการยิม',
    description: 'Comprehensive gym management system with membership tracking, class scheduling, payment processing, and trainer management.',
    descriptionTh: 'ระบบจัดการยิมที่ครบครัน ติดตามสมาชิก จัดตารางเรียน ประมวลผลการชำระเงิน และจัดการเทรนเนอร์',
    category: 'FULL STACK',
    year: '2025',
    techStack: ['Java', 'MySQL'],
    githubUrl: 'https://github.com/ThanakhonOonklan/Gym-Management-System',
  },
  {
    id: 5,
    title: 'C++ Console Mini Games Hub',
    titleTh: 'รวมมินิเกมบนคอนโซลด้วยภาษา C++',
    description: 'A collection of classic console and terminal-based minigames built with C++, including Hangman, Number Guessing, and more, using OOP principles.',
    descriptionTh: 'รวมมินิเกมในเทอร์มินัลที่พัฒนาด้วย C++ ได้แก่ Hangman, เกมทายตัวเลข และอื่นๆ โดยใช้หลักการ OOP',
    category: 'PROGRAMMING',
    year: '2023',
    techStack: ['C++'],
    githubUrl: 'https://github.com/ThanakhonOonklan/cpp-minigames-collection',
  },
  {
    id: 6,
    title: 'ESP32 Gesture Control Robot Car',
    titleTh: 'รถหุ่นยนต์ควบคุมด้วยท่าทางมือ ESP32',
    description: 'Omnidirectional 4-wheel robot car controlled wirelessly via hand gestures using ESP32, MPU6050 accelerometer and gyroscope.',
    descriptionTh: 'รถหุ่นยนต์ Omnidirectional ขับเคลื่อน 4 ล้อ ควบคุมผ่านท่าทางมือด้วย ESP32 และเซนเซอร์ MPU6050 แบบ Wireless',
    category: 'EMBEDDED & IOT',
    year: '2023',
    techStack: ['Arduino', 'C++'],
    githubUrl: 'https://github.com/ThanakhonOonklan/esp32-gesture-car',
  },
  {
    id: 7,
    title: 'Footstep Piezoelectric Energy Harvesting System',
    titleTh: 'ระบบเก็บเกี่ยวพลังงานจากแรงกดก้าวเดินด้วยพีโซอิเล็กทริก',
    description: 'Research and implementation of a piezoelectric energy harvesting system converting footstep vibrations into usable electrical energy with standalone power management.',
    descriptionTh: 'ระบบเก็บเกี่ยวพลังงานจากแรงกดก้าวเดินด้วยวัสดุพีโซอิเล็กทริก แปลงแรงสั่นสะเทือนเป็นพลังงานไฟฟ้า พร้อมวงจรชาร์จและตรวจวัดระดับพลังงาน',
    category: 'RESEARCH & IOT',
    year: '2025',
    techStack: ['Arduino', 'C++'],
    githubUrl: 'https://github.com/ThanakhonOonklan/piezoelectric-energy-harvesting',
  },
];

export default function ProjectsPage() {
  const { isEN } = useLocale();

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4 pt-32 pb-24">

        {/* Page Header */}
        <div className="mb-16">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9CA3AF] font-mono mb-3">
            {isEN ? 'ARCHIVE' : 'คลังผลงาน'}
          </span>
          <h1
            className="font-en-heading text-[48px] sm:text-[64px] md:text-[80px] font-normal tracking-wide text-white leading-tight mb-4 uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
            }}
          >
            Technical Projects
          </h1>
          <p
            className="max-w-xl"
            style={{ fontSize: '16px', color: '#9CA3AF', fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
          >
            {isEN
              ? 'A complete collection of my technical work, systems, and digital projects.'
              : 'รวมผลงานทางเทคนิคทั้งหมดของผม ได้แก่ ระบบ เครื่องมือ และโปรเจกต์ดิจิทัลต่างๆ'}
          </p>
        </div>

        {/* Projects Table */}
        <div className="flex flex-col">
          {archiveProjects.map((project, idx) => (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[3.25rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-6 border-t border-white/[0.07] py-5 sm:py-6 hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {/* Index Number */}
              <div className="flex items-center justify-start self-center">
                <span
                  className="font-en-heading text-[26px] sm:text-[34px] tracking-[0.08em] text-transparent select-none"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.4)',
                    lineHeight: 1,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-2.5">
                {/* Title */}
                <h2
                  className="font-en-body font-semibold text-white text-[18px] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                  }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p
                  className="text-[16px] leading-relaxed line-clamp-2"
                  style={{ color: '#9CA3AF', fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                >
                  {isEN ? project.description : project.descriptionTh}
                </p>

                {/* Tech Icons */}
                {project.techStack.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    {project.techStack.map((tech) => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                )}
              </div>

              {/* GitHub Arrow */}
              <div className="flex items-center justify-center self-center">
                <svg
                  className="w-4 h-4 text-[#4B5563] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.07]" />
        </div>

        {/* Back to Home */}
        <div className="mt-12 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-white transition-colors duration-200 group"
            style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {isEN ? 'Back to Home' : 'กลับหน้าหลัก'}
          </Link>
        </div>

      </div>
    </main>
  );
}
