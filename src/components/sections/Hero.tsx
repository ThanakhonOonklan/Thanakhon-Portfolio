'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks';
import { gsap } from 'gsap';
import { registerGSAP } from '@/lib/gsap';
import { PortraitFallback } from '@/components/ui';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLImageElement>(null);

  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // 1. Staggered reveal for Hero text on load
      const revealElements = [
        captionRef.current,
        nameLine1Ref.current,
        nameLine2Ref.current,
        introRef.current,
        ctaRef.current,
        socialRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        revealElements,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      // 2. Portrait wrapper entry animation
      if (portraitWrapperRef.current) {
        gsap.fromTo(
          portraitWrapperRef.current,
          {
            opacity: 0,
            scale: 0.95,
            x: 20,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.4,
            delay: 0.3,
            ease: 'power4.out',
          }
        );

      }

      // 5. Scroll indicator fade out on scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '30% top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background visual area — animated cinematic orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Pink Orb - Top Right */}
        <div
          className="absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(242,140,166,0.06)_0%,transparent_70%)] blur-[60px] animate-float-slow"
        />
        {/* Subtle Warm/White Orb - Bottom Left */}
        <div
          className="absolute bottom-[-10%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_75%)] blur-[80px] animate-float-slower"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]/60" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-12 gap-6 lg:gap-4">
          {/* Left content — spans 7 columns */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left" style={{ paddingTop: 'clamp(100px, 18vh, 20vh)' }}>
            {/* Caption label */}
            <span
              ref={captionRef}
              className="section-label mb-4 sm:mb-6 gsap-reveal font-en-body"
            >
              {t('hero.caption')}
            </span>

            {/* Name — oversized Anton */}
            <h1 className="gsap-reveal font-en-heading">
              <span
                ref={nameLine1Ref}
                className="block font-en-heading"
                style={{ fontSize: 'var(--text-hero)', lineHeight: 0.9 }}
              >
                THANAKHON
              </span>
              <span
                ref={nameLine2Ref}
                className="block font-en-heading"
                style={{
                  fontSize: 'var(--text-hero)',
                  lineHeight: 0.9,
                  color: 'var(--accent)',
                  textShadow: '0 0 40px var(--glow-accent)',
                }}
              >
                OONKLAN
              </span>
            </h1>
          </div>

          {/* Right side — Portrait Image Area with Scroll-triggered Parallax */}
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center lg:justify-end mt-6 sm:mt-10 lg:mt-0 pb-12 sm:pb-16 lg:pb-0 relative z-10">
            <div
              ref={portraitWrapperRef}
              className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] aspect-[3/4] overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] group rounded-sm shadow-2xl backdrop-blur-md transition-all duration-300 glow-accent"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Outer Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              {/* Dynamic Tech Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-white/30 z-20 pointer-events-none group-hover:border-[var(--accent)] transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-white/30 z-20 pointer-events-none group-hover:border-[var(--accent)] transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-white/30 z-20 pointer-events-none group-hover:border-[var(--accent)] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-white/30 z-20 pointer-events-none group-hover:border-[var(--accent)] transition-colors duration-300" />

              {/* Image Mode */}
              {!imgError ? (
                <img
                  ref={portraitImageRef}
                  src="/images/profile/profile-3.jpg"
                  alt="Thanakhon Oonklan Portrait"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out scale-100"
                />
              ) : (
                <PortraitFallback />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />


              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-col gap-1 z-20 pointer-events-none">
                <h5 className="text-white text-xs sm:text-base tracking-[0.1em] font-[family-name:var(--font-thai)] uppercase font-bold">
                  THANAKHON OONKLAN
                </h5>
                <span className="text-[8px] sm:text-[9px] text-[var(--accent)] tracking-[0.15em] font-[family-name:var(--font-thai)] uppercase font-semibold">
                  {t('common.role').toUpperCase()}
                </span>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 scroll-indicator hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-[var(--text-muted)] tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--accent)]/60 to-transparent" />
      </div>
    </section>
  );
}
