'use client';

import { useRef, useState } from 'react';
import { otherSkills } from '@/data/otherSkills';
import { useLocale, useTranslation } from '@/hooks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { registerGSAP } from '@/lib/gsap';
import { Lightbox } from '@/components/ui';
import { TechIcon } from '@/components/projects/TechIcon';

export default function OtherSkills() {
  registerGSAP();
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { isEN } = useLocale();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useGSAP(() => {
    // Reveal animation for section headers (gsap-reveal)
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
      id="other-skills"
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
            {t('other_skills.label')}
          </span>
          <h2
            className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase gsap-reveal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('other_skills.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {otherSkills.map((item, index) => {
            const description = isEN && item.descriptionEn ? item.descriptionEn : item.description;

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-start"
              >
                {/* Content Column (40%) */}
                <div className="flex flex-col gap-6 lg:col-span-5 order-2 lg:order-1">
                  {/* Category + Year */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.25em] font-mono"
                        style={{ color: 'var(--accent)' }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="text-[12px] sm:text-[13px] font-mono tracking-wider"
                        style={{ color: '#9CA3AF' }}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-white font-en-heading uppercase leading-tight tracking-wide"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '37px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: '16px',
                      color: '#9CA3AF',
                      fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                      fontWeight: 400,
                    }}
                  >
                    {description}
                  </p>

                  {/* Tools / Tech Used */}
                  {item.tools && item.tools.length > 0 && (
                    <div className="border-t border-white/[0.05] pt-6">
                      <h4
                        className="font-en-body text-[18px] font-bold text-white uppercase tracking-wider mb-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {isEN ? 'Tools Used' : 'เครื่องมือที่ใช้'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                        {item.tools.map((tool) => (
                          <TechIcon key={tool} tech={tool} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Image / Gallery Column (60%) */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  {item.images && item.images.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4">
                      {item.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 flex items-center justify-center break-inside-avoid cursor-pointer group"
                          onClick={() => setSelectedImage(img)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white bg-black/60 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase backdrop-blur-md font-en-body flex items-center gap-2 border border-white/20">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                              {t('other_skills.view_image')}
                            </span>
                          </div>
                          <img
                            src={img}
                            alt={`${item.title} image ${i + 1}`}
                            className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500 rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Placeholder when no images */
                    <div
                      className="w-full flex items-center justify-center border border-white/10 bg-[var(--bg-elevated)] rounded-2xl shadow-xl"
                      style={{ aspectRatio: '16/10' }}
                    >
                      <span
                        className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] font-en-heading select-none opacity-20"
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
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
