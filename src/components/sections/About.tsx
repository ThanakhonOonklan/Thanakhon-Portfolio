'use client';

import { useState } from 'react';
import { useTranslation, useLocale } from '@/hooks';
import dynamic from 'next/dynamic';
import { PortraitFallback, Button } from '@/components/ui';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

function renderFormattedBio(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export default function About() {
  const [imgError, setImgError] = useState(false);
  const [githubYear, setGithubYear] = useState<number | 'last'>('last');
  const { t } = useTranslation();
  const { isEN } = useLocale();
  
  const currentYear = new Date().getFullYear();
  const years = [2026, 2025];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'clamp(120px, 16vh, 190px)',
        paddingBottom: 'clamp(100px, 12vh, 150px)',
      }}
    >
      {/* Container Matching Navbar max-w-7xl */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4">
        {/* Top Tag & Main Headline */}
        <div className="mb-6 sm:mb-8">
          <span
            className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9CA3AF] mb-2"
            style={{ fontFamily: isEN ? 'var(--font-mono, monospace)' : 'var(--font-thai)' }}
          >
            {t('about.label')}
          </span>
          <h2
            className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('about.headline')}
          </h2>
        </div>

        {/* Profile Grid: Avatar on Left, All Content on Right (Never wraps under image) */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-8 md:gap-10 items-start mb-8 sm:mb-10">
          {/* Left Column: Circular Avatar and Info */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shrink-0 shadow-xl mx-auto">
              {!imgError ? (
                <img
                  src="/images/profile/profile-3.jpg"
                  alt="Thanakhon Oonklan"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <PortraitFallback />
              )}
            </div>

            <div className="flex flex-col items-center text-center gap-1 mt-1">
              <span
                className="text-white font-semibold text-[17px]"
                style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
              >
                {t('about.role_title')}
              </span>
              <span
                className="text-[#9CA3AF] text-[14px] max-w-[240px] leading-snug"
                style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
              >
                {t('about.university')}
              </span>
            </div>

            <a 
              href={isEN ? '/resume/CV-Thanakhon-Oonklan-EN.pdf' : '/resume/CV-Thanakhon-Oonklan-TH.pdf'}
              download={isEN ? 'CV-Thanakhon-Oonklan-EN.pdf' : 'CV-Thanakhon-Oonklan-TH.pdf'}
              className="w-full max-w-[220px] bg-[#21262d] border border-[#363b42] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white transition-colors h-8 text-xs font-medium rounded-md inline-flex items-center justify-center select-none"
              style={{ fontFamily: 'var(--font-body)' }}
              onClick={() => fetch('/api/visitor/resume', { method: 'POST' }).catch(() => {})}
            >
              Download my resume
            </a>
          </div>

          {/* Right Column: Name + Stats + Narrative (Center on mobile, Left on desktop) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 items-center md:items-start text-center md:text-left">
            {/* Name + Verified Badge */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase"
                style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
              >
                {t('about.avatar_name')}
              </h3>
              <img
                src="/images/about/badge.png"
                alt="Verified"
                className="about-profile-badge w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0 select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10 pb-1 text-center md:text-left">
              <div>
                <span
                  className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-0.5"
                  style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                >
                  {t('about.stat_projects_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_projects_val')}
                </span>
              </div>

              <div>
                <span
                  className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-0.5"
                  style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                >
                  {t('about.stat_certificates_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_certificates_val')}
                </span>
              </div>

              <div>
                <span
                  className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-0.5"
                  style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                >
                  {t('about.stat_education_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_education_val')}
                </span>
              </div>
            </div>

            {/* Bio Narrative */}
            <div className="flex flex-col mt-2 text-center md:text-left">
              <p
                className="leading-relaxed whitespace-pre-line text-center md:text-left"
                style={{
                  fontSize: '16px',
                  color: '#9CA3AF',
                  fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                  fontWeight: 400,
                }}
              >
                {renderFormattedBio(t('about.bio_intro'))}
              </p>
            </div>

            {/* GitHub Contributions */}
            <div className="mt-6 w-full flex flex-col md:flex-row gap-6 items-start justify-center border border-white/10 rounded-xl p-4 sm:p-6 bg-[#0d1117] relative z-10 shadow-lg">
              <div className="overflow-x-auto scrollbar-none flex justify-center flex-1 w-full">
                <GitHubCalendar
                  username="ThanakhonOonklan"
                  year={githubYear}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  colorScheme="dark"
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                  }}
                />
              </div>
              
              {/* Year Selector */}
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 md:pt-4 w-full md:w-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setGithubYear(year === currentYear ? 'last' : year)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium text-left transition-colors ${
                      (githubYear === 'last' && year === currentYear) || githubYear === year
                        ? 'bg-[#1f6feb] text-white'
                        : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
