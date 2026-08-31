'use client';

import { useRef, useState, useEffect } from 'react';
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

const EXPERIENCE_IMAGE_SETS: Record<number, string[]> = {
  0: [
    '/images/projects/Robot/Robot_7.jpg',
    '/images/projects/Robot/Robot_1.jpg',
    '/images/projects/Robot/Robot_2.jpg',
    '/images/projects/Robot/Robot_3.jpg',
    '/images/projects/Robot/Robot_4.jpg',
    '/images/projects/Robot/Robot_5.jpg',
    '/images/projects/Robot/Robot_6.jpg',
  ],
  1: [
    '/images/projects/Internship/Internship-Photo1.jpg',
    '/images/projects/Internship/Internship-Photo2.jpg',
    '/images/projects/Internship/Internship-Photo3.jpg',
    '/images/projects/Internship/Internship-Photo4.jpg',
    '/images/projects/Internship/Internship-Photo5.jpg',
    '/images/projects/Internship/Internship-Photo6.jpg',
    '/images/projects/Internship/Internship-Photo7.jpg',
    '/images/projects/Internship/Internship-Photo8.jpg',
  ],
  2: [
    '/images/projects/IotEquipmentSystem-Project/Dashboard.png',
    '/images/projects/IotEquipmentSystem-Project/borrow.png',
    '/images/projects/IotEquipmentSystem-Project/equipment.png',
    '/images/projects/IotEquipmentSystem-Project/history.png',
    '/images/projects/IotEquipmentSystem-Project/return-equipment.jpg',
    '/images/projects/IotEquipmentSystem-Project/users.png',
  ],
  3: [
    '/images/projects/Footstep-Piezoelectric-Energy-Harvesting/S__2834437.jpg',
    '/images/projects/Footstep-Piezoelectric-Energy-Harvesting/S__2924549_0.jpg',
    '/images/projects/Footstep-Piezoelectric-Energy-Harvesting/S__2924550_0.jpg',
    '/images/projects/Footstep-Piezoelectric-Energy-Harvesting/S__2990082.jpg',
  ],
};

function AutoImageSlider({
  images,
  alt,
  year,
  onImageClick,
  isEN,
  intervalMs = 3500,
}: {
  images: string[];
  alt: string;
  year: string;
  onImageClick: (img: string) => void;
  isEN: boolean;
  intervalMs?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [images, intervalMs]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/10] p-2 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xl flex items-center justify-center overflow-hidden">
        <div className="w-full h-full rounded-xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-2">
          <svg className="w-8 h-8 opacity-20 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <span className="font-[family-name:var(--font-heading)] text-white/20 font-en-heading select-none text-2xl tracking-widest uppercase">
            {year}
          </span>
        </div>
      </div>
    );
  }

  const currentImg = images[currentIndex];

  return (
    <div
      className="relative w-full aspect-[16/10] p-2 rounded-2xl bg-white/[0.03] border border-white/15 shadow-2xl group cursor-pointer hover:border-white/30 transition-all duration-300 overflow-hidden"
      onClick={() => onImageClick(currentImg)}
    >
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${alt} image ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105 rounded-xl ${
              i === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-102 z-0 pointer-events-none'
            }`}
            loading="lazy"
          />
        ))}

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/80 select-none">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Hover View Full Image Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl z-30">
          <span className="text-white bg-black/70 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase backdrop-blur-md font-en-body flex items-center gap-2 border border-white/20 shadow-lg">
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
    </div>
  );
}

export default function Experience() {
  registerGSAP();
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { isEN } = useLocale();
  const [lightboxData, setLightboxData] = useState<{ images: string[], index: number } | null>(null);

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
            const images = EXPERIENCE_IMAGE_SETS[index] || [];
            const interval = 3200 + index * 400; // Staggered interval so all sliders don't switch at the exact same frame

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

                      {/* Single Auto-Transitioning Framed Image Box (Right sub-col) */}
                      <div className="md:col-span-5 flex items-center justify-center">
                        <AutoImageSlider
                          images={images}
                          alt={`${exp.role} - ${exp.company}`}
                          year={exp.year}
                          onImageClick={(img) => setLightboxData({ images, index: images.indexOf(img) })}
                          isEN={isEN}
                          intervalMs={interval}
                        />
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
        isOpen={!!lightboxData}
        images={lightboxData?.images || []}
        initialIndex={lightboxData?.index || 0}
        onClose={() => setLightboxData(null)}
      />
    </section>
  );
}
