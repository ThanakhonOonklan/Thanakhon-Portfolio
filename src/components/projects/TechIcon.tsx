'use client';

import React from 'react';

// Mapping to official skillicons.dev icon identifiers
const SKILL_ICONS_MAP: Record<string, string> = {
  // Frontend & Core
  'Next.js': 'nextjs',
  'React': 'react',
  'TypeScript': 'ts',
  'JavaScript': 'js',
  'Tailwind CSS': 'tailwind',
  'HTML': 'html',
  'HTML5': 'html',
  'CSS': 'css',
  'CSS3': 'css',
  'Material UI': 'materialui',
  'Three.js': 'threejs',
  'Flutter': 'flutter',

  // Languages
  'Python': 'py',
  'Python Django': 'django',
  'Django': 'django',
  'Python Flask': 'flask',
  'Flask': 'flask',
  'PHP': 'php',
  'CodeIgniter 4': 'php',
  'CodeIgniter': 'php',
  'C++': 'cpp',
  'Java': 'java',

  // Backend & Databases
  'Node.js': 'nodejs',
  'Express': 'express',
  'FastAPI': 'fastapi',
  'PostgreSQL': 'postgres',
  'MySQL': 'mysql',
  'Supabase': 'supabase',
  'Prisma': 'prisma',
  'Redis': 'redis',
  'Docker': 'docker',
  'JWT': 'jwt',

  // AI & Data
  'Scikit-learn': 'sklearn',
  'TensorFlow': 'tensorflow',

  // Tools & Design & Deployment
  'Vercel': 'vercel',
  'Arduino': 'arduino',
  'ESP32': 'arduino',
  'ESP8266': 'arduino',
  'IoT': 'arduino',
  'VS Code': 'vscode',
  'Figma': 'figma',
  'Photoshop': 'ps',
  'Illustrator': 'ai',
  'Canva': 'canva',
  'Blender': 'blender',
  'Premiere': 'pr',
  'After Effects': 'ae',
  'Postman': 'postman',
  'Git': 'git',
  'GitHub': 'github',
  'Linux': 'linux',
  'Bash': 'bash',
};

// Mapping for custom local icons
const CUSTOM_ICONS_MAP: Record<string, string> = {
  'ABB RAPID': '/images/logos/ABB.png',
  'KUKA KRL': '/images/logos/KUKA.png',
  'Yaskawa INFORM': '/images/logos/Yaskawa-Photoroom.png',
};

interface TechIconProps {
  tech: string;
}

export function TechIcon({ tech }: TechIconProps) {
  const iconSlug = SKILL_ICONS_MAP[tech];
  const customIconUrl = CUSTOM_ICONS_MAP[tech];

  // If no official SkillIcon exists and no custom icon, render a clean badge
  if (!iconSlug && !customIconUrl) {
    return (
      <span className="inline-flex items-center text-[12px] font-mono font-medium text-[#9CA3AF] px-3 py-1 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-colors select-none">
        {tech}
      </span>
    );
  }

  const iconSrc = customIconUrl || `https://skillicons.dev/icons?i=${iconSlug}`;

  return (
    <div
      className="group/tech relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-200 hover:scale-120 cursor-pointer select-none"
      title={tech}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={tech}
        className="w-full h-full object-contain rounded-md"
        draggable={false}
        loading="lazy"
      />

      {/* Hover Tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-150 bg-[#111111] text-white text-[11px] font-[family-name:var(--font-body)] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap z-40 shadow-xl">
        {tech}
      </span>
    </div>
  );
}
