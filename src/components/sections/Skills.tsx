'use client';

import { skills } from '@/data/skills';
import { useTranslation, useLocale } from '@/hooks';

export default function Skills() {
  const { t } = useTranslation();
  const { isEN } = useLocale();

  const techSkills = skills.filter((s) => s.category !== 'Tools');
  const toolSkills = skills.filter((s) => s.category === 'Tools');

  return (
    <section
      id="skills"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'clamp(60px, 8vh, 100px)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-label block mb-4 gsap-reveal font-[family-name:var(--font-body)]">
            {t('skills_section.label')}
          </span>
          <h2
            className="section-title gsap-reveal font-en-heading uppercase"
          >
            {t('skills_section.title')}
          </h2>
        </div>

        {/* 1. Development & Tech Stack */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <span className="w-8 sm:w-12 h-px bg-white/10" />
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#9CA3AF]">
              {isEN ? 'Development & Technologies' : 'การพัฒนาและเทคโนโลยี'}
            </span>
            <span className="w-8 sm:w-12 h-px bg-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-x-10 lg:gap-y-10 gsap-reveal">
            {techSkills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 cursor-default"
              >
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={52}
                    height={52}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] rounded-md"
                  />
                ) : (
                  <div className="w-13 h-13 rounded bg-white/5" />
                )}

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

        {/* 2. Productivity, Design & Collaboration Tools */}
        <div className="pt-10 sm:pt-12 border-t border-white/[0.06]">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <span className="w-8 sm:w-12 h-px bg-white/10" />
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#9CA3AF]">
              {isEN ? 'Productivity & Creative Tools' : 'เครื่องมือการทำงานและการออกแบบ'}
            </span>
            <span className="w-8 sm:w-12 h-px bg-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-x-10 lg:gap-y-10 gsap-reveal">
            {toolSkills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 cursor-default"
              >
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={52}
                    height={52}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] rounded-md"
                  />
                ) : (
                  <div className="w-13 h-13 rounded bg-white/5" />
                )}

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

      </div>
    </section>
  );
}
