'use client';

import { useState } from 'react';
import { useTranslation, useLocale } from '@/hooks';

export default function Contact() {
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();
  const { isEN } = useLocale();

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'clamp(60px, 8vh, 100px)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4">
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Avatar with Spinning Text Badge */}
          <div className="flex justify-center items-center relative md:col-span-6">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center">
              {/* Infinite Rotating Circular Text Path SVG */}
              <div className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite] select-none pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="contactTextCircle"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                      fill="none"
                    />
                  </defs>
                  <text className="fill-[color:var(--accent)] opacity-60 font-[family-name:var(--font-body)] text-[9.5px] uppercase tracking-[0.25em] font-medium">
                    <textPath href="#contactTextCircle" startOffset="0%">
                      {t('contact.badge')}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central Circular Avatar */}
              <div className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-2 border-white/20 bg-neutral-900 shadow-2xl relative z-10 group backdrop-blur-md">
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--accent)]/15 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

                {/* The Avatar Image */}
                {!imgError ? (
                  <img
                    src="/images/profile/profile-3.jpg"
                    alt="Thanakhon Oonklan - Contact"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  /* Fallback */
                  <div className="w-full h-full bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-4">
                    <svg className="w-10 h-10 text-white/30 mb-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[9px] text-[var(--accent)] font-mono uppercase tracking-wider text-center">
                      Ready for Photo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Text & Social Links */}
          <div className="flex flex-col justify-center items-center text-center md:col-span-6 md:items-start md:text-left w-full">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9CA3AF] font-mono mb-2 gsap-reveal">
              {t('contact.label')}
            </span>

            {/* Title */}
            <h2
              className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase mb-4 gsap-reveal"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('contact.title')}
            </h2>

            {/* Description */}
            <p
              className="leading-relaxed max-w-sm sm:max-w-md gsap-reveal mx-auto md:mx-0"
              style={{
                fontSize: '16px',
                color: '#9CA3AF',
                fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                fontWeight: 400,
                marginBottom: 'clamp(28px, 4vh, 48px)',
              }}
            >
              {t('contact.desc')}
            </p>

            {/* Action / Resume Button */}
            <div
              className="flex items-center justify-center md:justify-start gsap-reveal"
              style={{ marginTop: 'clamp(8px, 2vh, 16px)' }}
            >
              {/* Resume Button */}
              <a
                href={isEN ? '/resume/CV-Thanakhon-Oonklan-EN.pdf' : '/resume/CV-Thanakhon-Oonklan-TH.pdf'}
                download={isEN ? 'CV-Thanakhon-Oonklan-EN.pdf' : 'CV-Thanakhon-Oonklan-TH.pdf'}
                className="inline-flex items-center gap-2 px-7 h-11 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full !bg-white !text-black border border-white hover:!bg-transparent hover:!text-white transition-colors duration-300 shadow-md cursor-pointer select-none"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>{isEN ? 'Download Resume' : 'ดาวน์โหลดเรซูเม่'}</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
