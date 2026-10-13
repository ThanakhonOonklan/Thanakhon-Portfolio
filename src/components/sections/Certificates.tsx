'use client';

import { useState } from 'react';
import { certificates } from '@/data/certificates';
import { useTranslation, useLocale } from '@/hooks';
import { Lightbox } from '@/components/ui';
import type { Certificate } from '@/types';
import CardSwap, { Card } from '@/components/reactbits/CardSwap';
import Image from 'next/image';

/** Data stores full dates (dd/mm/yyyy) or a bare year — show only the year */
const yearOf = (value: string) => value.slice(-4);

export default function Certificates() {
  const { t } = useTranslation();
  const { isEN } = useLocale();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  // Index (in certList) of the card currently at the front of the stack
  const [frontIndex, setFrontIndex] = useState(0);

  const certList = certificates.filter((c) => !!c.imageUrl);
  const bodyFont = isEN ? 'var(--font-body)' : 'var(--font-thai)';

  const kindLabel = (cert: Certificate) =>
    cert.kind === 'award' ? (isEN ? 'Award' : 'รางวัล') : isEN ? 'Course' : 'หลักสูตร';

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

        {/* 60 / 40 split — descriptions on the left, swapping card stack on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Left (60%): short description of every certificate */}
          <ol className="lg:col-span-3 order-2 lg:order-1 flex flex-col" style={{ fontFamily: bodyFont }}>
            {certList.map((cert, index) => {
              const isFront = index === frontIndex;
              const organization = isEN && cert.organizationEn ? cert.organizationEn : cert.organization;
              return (
                <li key={cert.id}>
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className={`group w-full text-left flex gap-4 sm:gap-5 py-4 border-b border-white/[0.06] transition-colors duration-300 cursor-pointer ${
                      isFront ? 'text-white' : 'text-white/55 hover:text-white/85'
                    }`}
                    aria-label={`${isEN ? 'View' : 'ดู'} ${cert.title}`}
                  >
                    <span
                      className={`font-mono text-[12px] pt-1 w-6 shrink-0 transition-colors duration-300 ${
                        isFront ? 'text-[#F28CA6]' : 'text-white/30'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[15px] sm:text-[16px] font-semibold leading-snug">{cert.title}</span>
                        <span className="font-mono text-[12px] sm:text-[13px] text-[#9CA3AF] shrink-0">
                          {yearOf(cert.year)}
                        </span>
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#9CA3AF]">
                        <span
                          className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${
                            cert.kind === 'award' ? 'text-[#F28CA6]' : 'text-white/45'
                          }`}
                        >
                          {kindLabel(cert)}
                        </span>
                        <span className="text-white/20">·</span>
                        <span>{organization}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Right (40%): CardSwap stack — click the front card to enlarge, other cards to bring them forward */}
          <div className="lg:col-span-2 order-1 lg:order-2 w-full h-[320px] sm:h-[420px] lg:h-[480px]">
            <CardSwap
              width={420}
              height={315}
              cardDistance={40}
              verticalDistance={45}
              delay={4500}
              cardRadius={14}
              onChange={setFrontIndex}
              onCardClick={(index: number) => {
                if (index === frontIndex) setActiveCert(certList[index]);
              }}
            >
              {certList.map((cert) => (
                <Card key={cert.id}>
                  <div className="relative w-full h-full bg-[#14171F]">
                    <Image
                      src={cert.imageUrl!}
                      alt={cert.title}
                      fill
                      sizes="420px"
                      className="object-contain p-2"
                      draggable={false}
                    />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
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
