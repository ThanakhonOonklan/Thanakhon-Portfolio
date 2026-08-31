'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/types';
import { useLocale } from '@/hooks';
import { TechIcon } from './TechIcon';
import { gsap } from 'gsap';
import { registerGSAP } from '@/lib/gsap';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectCaseStudyProps {
  project: Project;
  index: number;
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function ProjectCaseStudy({ project, index }: ProjectCaseStudyProps) {
  const isEven = index % 2 === 1;
  const { isEN } = useLocale();
  const rowRef = useRef<HTMLElement>(null);

  const subtitle = isEN && project.subtitleEn ? project.subtitleEn : project.subtitle;
  const whatIDid = isEN && project.whatIDidEn ? project.whatIDidEn : project.whatIDid;
  const features = isEN && project.featuresEn ? project.featuresEn : project.features;
  const results = isEN && project.resultsEn ? project.resultsEn : project.results;

  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.imageUrl ? [project.imageUrl] : [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <article
        ref={rowRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 py-8 sm:py-16 relative"
      >
        {/* ── Content Side (40%) ── */}
        <div
          className={`flex flex-col gap-6 lg:col-span-5 order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {/* Header block: Category (above) + Title (Anton 37px) + Year */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] font-mono"
                style={{ color: 'var(--accent)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[12px] sm:text-[13px] font-mono tracking-wider"
                style={{ color: '#9CA3AF' }}
              >
                {project.year}
              </span>
            </div>
            <h3
              className="text-white font-en-heading uppercase leading-tight tracking-wide"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '37px',
                letterSpacing: '0.04em',
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Short description */}
          <p
            className="font-[family-name:var(--font-body)] leading-relaxed"
            style={{ fontSize: '16px', color: '#9CA3AF' }}
          >
            {subtitle}
          </p>

          {/* Details Section */}
          <div className="flex flex-col gap-6 border-t border-white/[0.05] pt-6">

            {/* What I Did */}
            {whatIDid && whatIDid.length > 0 && (
              <div>
                <h4
                  className="font-en-body text-[18px] font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-body)', marginBottom: '16px' }}
                >
                  {isEN ? 'Role & Responsibilities' : 'หน้าที่และความรับผิดชอบ'}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {whatIDid.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#9CA3AF] leading-relaxed flex items-start gap-3"
                      style={{ fontSize: '16px', fontWeight: 400, fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <div>
                <h4
                  className="font-en-body text-[18px] font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-body)', marginBottom: '16px' }}
                >
                  {isEN ? 'Key Features' : 'ฟีเจอร์เด่น'}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {features.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#9CA3AF] leading-relaxed flex items-start gap-3"
                      style={{ fontSize: '16px', fontWeight: 400, fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results */}
            {results && results.length > 0 && (
              <div>
                <h4
                  className="font-en-body text-[18px] font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-body)', marginBottom: '16px' }}
                >
                  {isEN ? 'Results & Impact' : 'ผลลัพธ์ที่ได้'}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {results.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#9CA3AF] leading-relaxed flex items-start gap-3"
                      style={{ fontSize: '16px', fontWeight: 400, fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4
                className="font-en-body text-[18px] font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-body)', marginBottom: '16px' }}
              >
                {isEN ? 'Tech Stack' : 'เทคโนโลยีที่ใช้'}
              </h4>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                {project.techStack.map((tech) => (
                  <TechIcon key={tech} tech={tech} />
                ))}
              </div>
            </div>

          </div>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 mt-auto border-t border-white/[0.05]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)', fontSize: '14px', color: '#c9d1d9' }}
              >
                <GithubIcon className="w-4 h-4 shrink-0" />
                <span>{isEN ? 'View Project Details' : 'ดูรายละเอียดโครงการ'}</span>
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/60 transition-all duration-200 group"
                style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)', fontSize: '14px', color: 'var(--accent)' }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>{isEN ? 'Launch Live Demo' : 'เปิดดูเว็บไซต์จริง'}</span>
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ── Image Side: Gallery with thumbnails (60%, Sticky scroll on desktop only) ── */}
        <div className={`lg:col-span-7 relative lg:sticky lg:top-28 lg:self-start z-10 order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          {allImages.length > 0 ? (
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedIndex}
                    src={allImages[selectedIndex]}
                    alt={`${project.title} — photo ${selectedIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="w-full h-auto block"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <span className="text-[11px] text-white/80 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/15 font-[family-name:var(--font-body)] tracking-wider">
                      {selectedIndex + 1} / {allImages.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
                  {allImages.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        idx === selectedIndex
                          ? 'border-white/60 opacity-100'
                          : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
                      }`}
                      style={{ width: '72px', height: '48px' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shadow-xl"
              style={{ aspectRatio: '16 / 10' }}
            >
              <span
                className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] font-en-heading select-none"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', opacity: 0.2 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
