'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks';
import { gsap } from 'gsap';
import { registerGSAP } from '@/lib/gsap';
import { PortraitFallback } from '@/components/ui';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Smooth fadeUp reveal for the image on scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Smooth fadeUp reveal for the story details
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-bg-gradient"
      style={{
        backgroundColor: 'var(--bg-primary)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — Image / Visual Area */}
          <div className="hidden lg:block col-span-12 lg:col-span-5">
            <div
              ref={imageRef}
              className="lg:sticky lg:top-28 w-full max-w-[300px] sm:max-w-[360px] xl:max-w-[420px] mx-auto lg:mx-0"
            >
              {/* About Me Portrait */}
              <div
                className="w-full overflow-hidden rounded-sm border border-[var(--glass-border)] shadow-2xl relative group bg-[var(--glass-bg)] backdrop-blur-md glow-accent"
                style={{ aspectRatio: '3 / 4' }}
              >
                {/* Actual photo */}
                {!imgError ? (
                  <img
                    src="/images/profile/profile-1.jpg"
                    alt="Thanakhon Oonklan - About"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <PortraitFallback />
                )}
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center" ref={storyRef}>
            {/* Section Label */}
            <span className="section-label block mb-2 font-[family-name:var(--font-body)]">{t('about.label')}</span>

            {/* Big Section Title */}
            <h2 className="section-title uppercase mb-8 font-en-heading">
              BIOGRAPHY
            </h2>

            {/* Intro sentence — placeholder dashes */}
            <div className="space-y-8">


              {/* Vertical Stack of structured content blocks (clean minimalist text entries) */}
              <div className="flex flex-col gap-8 md:gap-10 lg:gap-14 pt-6 lg:pt-10">
                {/* Block 1: Who I Am */}
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-[var(--accent)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_var(--glow-accent)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <h4 className="text-base md:text-lg tracking-[0.1em] text-[var(--accent)] group-hover:text-white uppercase transition-colors duration-300">
                      {t('about.who_i_am_title')}
                    </h4>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light font-[family-name:var(--font-body)] pl-6 md:pl-9 break-words">
                    {t('about.who_i_am_desc')}
                  </p>
                </div>

                {/* Block 2: Interests */}
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-[var(--accent)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_var(--glow-accent)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                    </span>
                    <h4 className="text-base md:text-lg tracking-[0.1em] text-[var(--accent)] group-hover:text-white uppercase transition-colors duration-300">
                      {t('about.interest_title')}
                    </h4>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light font-[family-name:var(--font-body)] pl-6 md:pl-9 break-words">
                    {t('about.interest_desc')}
                  </p>
                </div>

                {/* Block 3: Education & Learning */}
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-[var(--accent)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_var(--glow-accent)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                      </svg>
                    </span>
                    <h4 className="text-base md:text-lg tracking-[0.1em] text-[var(--accent)] group-hover:text-white uppercase transition-colors duration-300">
                      {t('about.education_title')}
                    </h4>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light font-[family-name:var(--font-body)] pl-6 md:pl-9 break-words">
                    {t('about.education_desc').split('\n').map((line: string, i: number) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>

                {/* Block 4: My Goals */}
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-[var(--accent)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_var(--glow-accent)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </span>
                    <h4 className="text-base md:text-lg tracking-[0.1em] text-[var(--accent)] group-hover:text-white uppercase transition-colors duration-300">
                      {t('about.goals_title')}
                    </h4>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light font-[family-name:var(--font-body)] pl-6 md:pl-9 break-words">
                    {t('about.goals_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

