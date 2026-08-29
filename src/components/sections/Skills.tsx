'use client';

import { skills } from '@/data/skills';
import { useTranslation } from '@/hooks';

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">

        {/* Label */}
        <span className="section-label block mb-4 text-center gsap-reveal font-[family-name:var(--font-body)]">{t('skills_section.label')}</span>

        {/* Centered Title */}
        <h2
          className="section-title text-center mb-10 md:mb-16 lg:mb-20 gsap-reveal font-en-heading uppercase"
        >
          {t('skills_section.title')}
        </h2>

        {/* All icons — single open area, flex-wrap centered */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-x-10 lg:gap-y-10 gsap-reveal">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center gap-3 cursor-default"
            >
              {/* Icon */}
              {skill.iconUrl ? (
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={52}
                  height={52}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
              ) : (
                <div className="w-13 h-13 rounded bg-white/5" />
              )}

              {/* Name */}
              <span
                className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-300 font-[family-name:var(--font-body)] text-center font-en-body"
                style={{ fontSize: 'var(--text-caption)' }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
