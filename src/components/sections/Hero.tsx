'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { registerGSAP } from '@/lib/gsap';
import { PortraitFallback } from '@/components/ui';
import TechText from '@/components/reactbits/TechText';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // 1. Text entrance animation
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' }
        );
      }

      // 2. Scroll indicator fade on scroll
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
      className="relative h-screen min-h-[600px] sm:min-h-[750px] md:min-h-[850px] w-full flex items-end justify-center overflow-hidden select-none cursor-default"
      style={{ backgroundColor: 'var(--bg-primary)', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Background Layer: 3 Concentric Circles (Responsive Scale) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden scale-75 sm:scale-90 md:scale-100 transition-transform">
        {/* Large Circle */}
        <div className="absolute w-[880px] h-[880px] min-w-[880px] min-h-[880px] rounded-full border border-white/[0.03]" />
        {/* Medium Circle */}
        <div className="absolute w-[580px] h-[580px] min-w-[580px] min-h-[580px] rounded-full border border-white/[0.035]" />
        {/* Small Circle */}
        <div className="absolute w-[300px] h-[300px] min-w-[300px] min-h-[300px] rounded-full border border-white/[0.04]" />
      </div>

      {/* Giant Tech Typography Behind Person (z-10) — canvas, interactive (hover reveal, drag letters) */}
      <div
        ref={nameRef}
        className="absolute top-[28%] sm:top-[34%] md:top-1/2 left-0 right-0 -translate-y-1/2 z-10 h-[clamp(90px,17vw,320px)]"
      >
        <TechText
          text="THANAKHON OONKLAN"
          className="font-en-heading uppercase"
          style={{ fontFamily: 'var(--font-heading)' }}
          fontWeight={400}
          fontSize={400}
          letterSpacing={0.025}
          color="rgba(255, 255, 255, 0.28)"
          accentColor="#F28CA6"
          reveal="area"
          reach={280}
          strokeWidth={1.2}
          dashLength={6}
          dashGap={3}
          lineStyle="dashed"
        />
      </div>

      {/* Foreground Layer: Person Portrait (z-20) */}
      <div
        className="relative z-20 flex flex-col items-center justify-end pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
      >
        {!imgError ? (
          <Image
            src="/images/profile/profile-3.jpg"
            alt="Thanakhon Oonklan"
            width={600}
            height={800}
            priority
            onError={() => setImgError(true)}
            draggable={false}
            className="h-[680px] sm:h-[720px] md:h-[760px] lg:h-[800px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] block select-none pointer-events-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
          />
        ) : (
          <div className="w-[360px] sm:w-[440px] md:w-[500px] h-[600px] sm:h-[680px] md:h-[740px]">
            <PortraitFallback />
          </div>
        )}
      </div>

      {/* Bottom Right: Minimal Scroll Down indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 right-6 sm:bottom-12 sm:right-10 z-30 flex flex-col items-center gap-3 select-none pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-white/70" />
        <span className="text-[10px] text-white/50 tracking-[0.25em] font-en-body uppercase [writing-mode:vertical-rl]">
          SCROLL DOWN
        </span>
      </div>
    </section>
  );
}
