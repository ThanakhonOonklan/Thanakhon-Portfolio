'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks';
import { BadgeCheck, Code2, FlaskConical, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortraitFallback } from '@/components/ui';

const TRAITS = [
  { id: '1', title: 'Adaptable' },
  { id: '2', title: 'Problem Solver' },
  { id: '3', title: 'Detail-Oriented' },
  { id: '4', title: 'Fast Learner' },
  { id: '5', title: 'Full-Stack Explorer' },
];

export default function About() {
  const [imgError, setImgError] = useState(false);
  const [traits, setTraits] = useState(TRAITS);
  const { t } = useTranslation();

  const cycleCard = () => {
    setTraits((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'clamp(40px, 6vh, 70px)',
        paddingBottom: 'clamp(50px, 8vh, 80px)',
      }}
    >
      {/* Strict Container Matching Navbar max-w-5xl */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Tag & Main Headline in Anton Font (Size 56px) */}
        <div className="mb-6 sm:mb-8">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400 font-mono mb-2">
            {t('about.label')}
          </span>
          <h2
            className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('about.headline')}
          </h2>
        </div>

        {/* Profile Grid: Avatar on Left, All Content on Right (Never wraps under image) */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-8 md:gap-10 items-start mb-8 sm:mb-10">
          {/* Left Column: Circular Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shrink-0 shadow-lg">
            {!imgError ? (
              <img
                src="/images/profile/profile-3.jpg"
                alt="Thanakhon Oonklan"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <PortraitFallback />
            )}
          </div>

          {/* Right Column: Name + Stats + Narrative (Strictly aligned in right column) */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {/* Name + Verified Badge in Inter Font */}
            <div className="flex items-center gap-2">
              <h3
                className="font-en-body text-xl sm:text-2xl font-bold tracking-tight text-white uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('about.avatar_name')}
              </h3>
              <BadgeCheck className="w-5 h-5 text-sky-400 shrink-0 fill-sky-400 text-black" />
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-10 pb-1">
              <div>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-0.5">
                  {t('about.stat_projects_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_projects_val')}
                </span>
              </div>

              <div>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-0.5">
                  {t('about.stat_certificates_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_certificates_val')}
                </span>
              </div>

              <div>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-0.5">
                  {t('about.stat_education_label')}
                </span>
                <span
                  className="font-en-body text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('about.stat_education_val')}
                </span>
              </div>
            </div>

            {/* Bio Narrative */}
            <div className="space-y-3 pt-0.5">
              <p
                className="font-en-body text-sm sm:text-base text-neutral-300 leading-relaxed font-light"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('about.bio')}
              </p>

              <p
                className="font-en-body text-xs sm:text-sm text-neutral-400"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('about.resume_prefix')}{' '}
                <a
                  href="#projects"
                  className="text-white font-medium underline underline-offset-4 decoration-white/60 hover:decoration-white hover:text-white transition-colors cursor-pointer"
                >
                  {t('about.resume_link')}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Split: Status Row & Trait Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-2">
          {/* Left: Status Items (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 md:gap-10">
              {/* Building */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4
                    className="font-en-body text-xs font-bold text-white leading-none mb-1 tracking-wide"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_building_title')}
                  </h4>
                  <p
                    className="font-en-body text-[11px] text-neutral-400 leading-none whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_building_desc')}
                  </p>
                </div>
              </div>

              {/* Exploring */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4
                    className="font-en-body text-xs font-bold text-white leading-none mb-1 tracking-wide"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_exploring_title')}
                  </h4>
                  <p
                    className="font-en-body text-[11px] text-neutral-400 leading-none whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_exploring_desc')}
                  </p>
                </div>
              </div>

              {/* Learning */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4
                    className="font-en-body text-xs font-bold text-white leading-none mb-1 tracking-wide"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_learning_title')}
                  </h4>
                  <p
                    className="font-en-body text-[11px] text-neutral-400 leading-none whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('about.currently_learning_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stacked Trait Cards (4 cols) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div
              className="relative w-[210px] h-[120px] flex items-center justify-center cursor-pointer select-none"
              onClick={cycleCard}
            >
              <AnimatePresence mode="popLayout">
                {traits.slice(0, 3).map((trait, idx) => {
                  const rotations = [0, 4, -5];
                  const yOffsets = [0, 5, 10];
                  const scaleOffsets = [1, 0.95, 0.9];
                  const opacities = [1, 0.5, 0.25];

                  return (
                    <motion.div
                      key={trait.id}
                      layout
                      initial={{ scale: 0.85, opacity: 0, y: -15 }}
                      animate={{
                        scale: scaleOffsets[idx],
                        opacity: opacities[idx],
                        y: yOffsets[idx],
                        rotate: rotations[idx],
                        zIndex: 3 - idx,
                      }}
                      exit={{ scale: 0.8, opacity: 0, y: 20 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                      className="absolute inset-x-0 top-0 rounded-xl border border-white/15 bg-[#181B22]/90 backdrop-blur-md p-4 flex flex-col justify-between h-[105px]"
                    >
                      <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase font-mono">
                        {t('about.trait_label')}
                      </span>
                      <h4
                        className="font-en-body text-base font-bold text-white tracking-wide"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {trait.title}
                      </h4>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
