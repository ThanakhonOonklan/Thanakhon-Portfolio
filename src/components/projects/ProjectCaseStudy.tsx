'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/types';
import { useLocale } from '@/hooks';
import { TechIcon } from './TechIcon';
import { gsap } from 'gsap';
import { registerGSAP } from '@/lib/gsap';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

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
  
  const [isExpanded, setIsExpanded] = useState(false);

  const subtitle = isEN && project.subtitleEn ? project.subtitleEn : project.subtitle;
  const whatIDid = isEN && project.whatIDidEn ? project.whatIDidEn : project.whatIDid;
  const features = isEN && project.featuresEn ? project.featuresEn : project.features;
  const results = isEN && project.resultsEn ? project.resultsEn : project.results;

  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.imageUrl ? [project.imageUrl] : [];

  // Image cycling state — store a list like the Trait deck
  const [imageQueue, setImageQueue] = useState(() => allImages.map((src, i) => ({ src, id: i })));

  const cycleImage = () => {
    if (imageQueue.length <= 1) return;
    setImageQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

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
          className={`flex flex-col gap-6 lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
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

          {/* Tech Stack Icons (no border, clean icons) */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 py-1">
            {project.techStack.map((tech) => (
              <TechIcon key={tech} tech={tech} />
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-5 pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-[family-name:var(--font-body)] font-en-body font-semibold uppercase tracking-[0.15em] text-[11px] hover:text-white transition-colors duration-200"
                style={{ color: '#9CA3AF' }}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-[family-name:var(--font-body)] font-en-body font-semibold uppercase tracking-[0.15em] text-[11px] transition-colors duration-200"
                style={{ color: 'var(--accent)' }}
              >
                View Live
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 font-[family-name:var(--font-body)] font-en-body font-semibold uppercase tracking-[0.15em] text-[11px] transition-colors duration-200 cursor-pointer ${
                isExpanded ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {isExpanded ? 'Hide Details' : 'Details'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Inline Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-8 flex flex-col gap-10 border-t border-white/[0.05] mt-4">
                  
                  {/* What I Did */}
                  {whatIDid && whatIDid.length > 0 && (
                    <div>
                      <h4
                        className="font-en-body text-[13px] font-bold text-white uppercase tracking-[0.15em] mb-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {isEN ? 'Role & Responsibilities' : 'หน้าที่และความรับผิดชอบ'}
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {whatIDid.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[14px] text-[#9CA3AF] leading-relaxed font-[family-name:var(--font-body)] flex items-start gap-3"
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
                        className="font-en-body text-[13px] font-bold text-white uppercase tracking-[0.15em] mb-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {isEN ? 'Key Features' : 'ฟีเจอร์เด่น'}
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {features.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[14px] text-[#9CA3AF] leading-relaxed font-[family-name:var(--font-body)] flex items-start gap-3"
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
                        className="font-en-body text-[13px] font-bold text-white uppercase tracking-[0.15em] mb-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {isEN ? 'Results & Impact' : 'ผลลัพธ์ที่ได้'}
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {results.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[14px] text-[#9CA3AF] leading-relaxed font-[family-name:var(--font-body)] flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Image Side: Stacked card deck (60%, Sticky scroll) ── */}
        <div className={`lg:col-span-7 sticky top-28 self-start z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          {imageQueue.length > 0 ? (
            <div
              className="relative w-full cursor-pointer select-none"
              style={{ aspectRatio: '16 / 10' }}
              onClick={cycleImage}
            >
              <AnimatePresence mode="popLayout">
                {imageQueue.slice(0, 3).map((img, idx) => {
                  const yOffsets = [0, 10, 20];
                  const scaleOffsets = [1, 0.97, 0.94];
                  const opacities = [1, 0.5, 0.25];

                  return (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ scale: 0.88, opacity: 0, y: -20 }}
                      animate={{
                        scale: scaleOffsets[idx],
                        opacity: opacities[idx],
                        y: yOffsets[idx],
                        zIndex: 3 - idx,
                      }}
                      exit={{ scale: 0.85, opacity: 0, y: 30 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={`${project.title} — photo ${img.id + 1}`}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Photo counter badge */}
              {imageQueue.length > 1 && (
                <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                  <span className="text-[10px] text-white/80 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/15 font-[family-name:var(--font-body)] tracking-wider uppercase shadow-xl">
                    {imageQueue.length} photos — tap to cycle
                  </span>
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
