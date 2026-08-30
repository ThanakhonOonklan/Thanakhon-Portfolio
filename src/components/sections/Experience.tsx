'use client';

import { useRef, useState } from 'react';
import { useTranslation, useLocale } from '@/hooks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { registerGSAP } from '@/lib/gsap';
import { Lightbox } from '@/components/ui';
import { TechIcon } from '@/components/projects/TechIcon';

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  description: string[];
  skills: string[];
}

const EXPERIENCE_IMAGES: Record<number, string> = {
  1: '/images/projects/IotEquipmentSystem-Project/Dashboard.png',
  2: '/images/projects/Internship/Internship-Photo1.jpg',
  3: '/images/projects/Robot/Robot_7.jpg',
};

export default function Experience() {
  registerGSAP();
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { isEN } = useLocale();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[];
  const experienceItems = Array.isArray(items) ? items : [];

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'clamp(60px, 8vh, 100px)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9CA3AF] font-mono mb-2 gsap-reveal">
            {t('experience.label')}
          </span>
          <h2
            className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase gsap-reveal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('experience.title')}
          </h2>
        </div>

        {/* Timeline List */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {experienceItems.map((exp, index) => {
            const image = EXPERIENCE_IMAGES[index] || null;

            return (
              <div
                key={index}
                className="gsap-reveal"
                data-experience-index={index}
              >
                {/* Timeline row */}
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  {/* Year Column (Left) */}
                  <div className="col-span-12 lg:col-span-2 flex lg:items-start lg:justify-end">
                    <div className="flex items-center gap-3 lg:gap-0">
                      {/* Mobile dot indicator */}
                      <div
                        className="lg:hidden w-2.5 h-2.5 rounded-full shrink-0 border border-white/20 shadow-[0_0_8px_var(--glow-accent)]"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      <span
                        className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] lg:text-right font-en-heading select-none text-[32px] sm:text-[40px] lg:text-[48px] leading-none"
                      >
                        {exp.year}
                      </span>
                    </div>
                  </div>

                  {/* Timeline Line Column (Center) */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                    {/* Glowing Dot */}
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-2.5 z-10 border border-white/20 shadow-[0_0_10px_var(--glow-accent-lg)] animate-pulse"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {/* Vertical Connector Line */}
                    {index < experienceItems.length - 1 && (
                      <div
                        className="absolute top-6 bottom-0 w-px"
                        style={{
                          background: 'linear-gradient(to bottom, var(--accent) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          opacity: 0.4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          height: 'calc(100% + 4rem)',
                        }}
                      />
                    )}
                  </div>

                  {/* Content & Image Column (Right) */}
                  <div className="col-span-12 lg:col-span-9 border-l-2 border-white/5 lg:border-l-0 pl-5 lg:pl-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                      
                      {/* Text details (Left sub-col) */}
                      <div className="md:col-span-7 flex flex-col gap-5">
                        {/* Role & Company */}
                        <div>
                          <h3
                            className="font-en-heading text-white uppercase leading-tight tracking-wide text-[28px] sm:text-[34px]"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {exp.role}
                          </h3>
                          <p
                            className="font-medium mt-1"
                            style={{ color: 'var(--accent)', fontSize: '15px' }}
                          >
                            {exp.company}
                          </p>
                        </div>

                        {/* Description / Responsibilities */}
                        <div>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] font-mono mb-3">
                            {t('experience.description_label')}
                          </span>
                          <ul className="flex flex-col gap-2">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="text-[#9CA3AF] leading-relaxed flex items-start gap-3"
                                style={{
                                  fontSize: '15px',
                                  fontWeight: 400,
                                  fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                                }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills with TechIcon */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="pt-2">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] font-mono mb-3">
                              {t('experience.skills_label')}
                            </span>
                            <div className="flex flex-wrap items-center gap-3">
                              {exp.skills.map((skill) => (
                                <TechIcon key={skill} tech={skill} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Single Compact Image Box (Right sub-col) */}
                      <div className="md:col-span-5">
                        {image && (
                          <div
                            className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl group cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                          >
                            <img
                              src={image}
                              alt={`${exp.role} - ${exp.company}`}
                              className="w-full h-auto object-cover object-top hover:scale-[1.03] transition-transform duration-500 rounded-xl"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="text-white bg-black/60 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase backdrop-blur-md font-en-body flex items-center gap-2 border border-white/20">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <circle cx="11" cy="11" r="8"></circle>
                                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                  <line x1="11" y1="8" x2="11" y2="14"></line>
                                  <line x1="8" y1="11" x2="14" y2="11"></line>
                                </svg>
                                {isEN ? 'View Image' : 'ดูรูปภาพ'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!selectedImage}
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
