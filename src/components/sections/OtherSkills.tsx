'use client';

import { useRef, useState } from 'react';
import { otherSkills } from '@/data/otherSkills';
import { useLocale, useTranslation } from '@/hooks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { registerGSAP } from '@/lib/gsap';
import { Lightbox } from '@/components/ui';

export default function OtherSkills() {
  registerGSAP();
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { isEN } = useLocale();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useGSAP(() => {
    // GSAP pinning logic removed as per user request

    // Removed text-reveal animation as per user request

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

    // Force refresh after DOM paints
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
        backgroundColor: 'var(--bg-primary)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-[var(--space-block)]">
          <span className="section-label block mb-4 gsap-reveal font-[family-name:var(--font-body)]">
            {t('other_skills.label')}
          </span>
          <h2 className="section-title gsap-reveal font-en-heading">
            {t('other_skills.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="block space-y-24 md:space-y-32 lg:space-y-[20vh]">
          {otherSkills.map((item, index) => {
            const description = isEN && item.descriptionEn ? item.descriptionEn : item.description;

            return (
              <div key={item.id} className="other-skill-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-start">
                {/* Content Column */}
                <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-last">
                    {/* Category + Year */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[var(--text-caption)] text-[var(--accent)] font-[family-name:var(--font-body)] tracking-widest uppercase font-en-body font-semibold">
                        {item.category}
                      </span>
                      <span className="w-8 h-px bg-[var(--text-muted)] opacity-50" />
                      <span className="text-[var(--text-caption)] text-[var(--text-muted)] font-[family-name:var(--font-body)] tracking-widest font-en-body">
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-[family-name:var(--font-heading)] text-white mb-6 font-en-heading leading-tight"
                      style={{ fontSize: 'var(--text-headline)' }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] mb-8 leading-relaxed text-base md:text-lg">
                      {description}
                    </p>

                    {/* Tools / Tech Used */}
                    {item.tools.length > 0 && (
                      <div>
                        <span className="text-xs text-[var(--accent)] mb-3 font-[family-name:var(--font-body)] block uppercase tracking-widest opacity-80">
                          {t('other_skills.tools_label')}
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                          {item.tools.map((tool) => (
                            <span
                              key={tool}
                              className="inline-flex items-center justify-center text-[11px] font-medium text-[var(--text-secondary)] font-[family-name:var(--font-body)] px-4 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 cursor-default font-en-body"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image / Gallery Column */}
                  <div className="lg:col-span-7 order-1 lg:order-first">
                    {item.images && item.images.length > 0 ? (
                      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4">
                        {item.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-black/20 flex items-center justify-center break-inside-avoid cursor-pointer group"
                            onClick={() => setSelectedImage(img)}
                          >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="text-white bg-black/50 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase backdrop-blur-md font-en-body flex items-center gap-2">
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
                              className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Placeholder when no images */
                      <div
                        className="w-full flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-2xl"
                        style={{ aspectRatio: '16/10' }}
                      >
                        <span
                          className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] font-en-heading opacity-50"
                          style={{ fontSize: 'var(--text-display)' }}
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
