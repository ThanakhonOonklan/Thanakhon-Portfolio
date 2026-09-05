'use client';

import { useState } from 'react';
import { certificates } from '@/data/certificates';
import { useTranslation } from '@/hooks';
import { Lightbox } from '@/components/ui';
import type { Certificate } from '@/types';

export default function Certificates() {
  const { t } = useTranslation();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const certList = certificates.filter((c) => !!c.imageUrl);

  return (
    <section
      id="certificates"
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
            {t('certificates.label')}
          </span>
          <h2
            className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase gsap-reveal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('certificates.title')}
          </h2>
        </div>

        {/* Certificate Items Grid — Pure image display with no dark background boxes/borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
          {certList.map((cert, index) => (
            <div
              key={cert.id}
              className="gsap-reveal group relative flex items-center justify-center cursor-pointer"
              data-cert-index={index}
              onClick={() => setActiveCert(cert)}
              role="button"
              aria-label={`View ${cert.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setActiveCert(cert);
              }}
            >
              {/* Image itself with frame and uniform size */}
              <div
                className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#14171F] flex items-center justify-center shadow-xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-white/30"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={cert.imageUrl!}
                  alt={cert.title}
                  className="w-full h-full object-contain p-2 md:p-3"
                  loading="lazy"
                />

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl">
                  <div className="w-11 h-11 rounded-full bg-black/65 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!activeCert}
        imageUrl={activeCert?.imageUrl ?? null}
        alt={activeCert?.title}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
}
