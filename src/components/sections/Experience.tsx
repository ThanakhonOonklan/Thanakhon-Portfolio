'use client';

import { useTranslation } from '@/hooks';

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  description: string[];
  skills: string[];
}

export default function Experience() {
  const { t } = useTranslation();

  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[];
  const experienceItems = Array.isArray(items) ? items : [];

  return (
    <section
      id="experience"
      className="section-bg-gradient"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-[var(--space-block)]">
          <span className="section-label block mb-4 gsap-reveal font-en-body">
            {t('experience.label')}
          </span>
          <h2 className="section-title gsap-reveal font-en-heading">
            {t('experience.title')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="flex flex-col" style={{ gap: 'var(--space-block)' }}>
          {experienceItems.map((exp, index) => (
            <div
              key={index}
              className="gsap-reveal"
              data-experience-index={index}
            >
              {/* Timeline entry — year anchored left */}
              <div className="grid grid-cols-12 gap-4 lg:gap-8">
                {/* Year Column */}
                <div className="col-span-12 lg:col-span-2 flex lg:items-center lg:justify-end">
                  <div className="flex items-center gap-3 lg:gap-0">
                    {/* Mobile dot indicator */}
                    <div
                      className="lg:hidden w-2.5 h-2.5 rounded-full shrink-0 border border-white/20 shadow-[0_0_8px_var(--glow-accent)]"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <span
                      className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] lg:text-right font-en-heading"
                      style={{ fontSize: 'var(--text-headline)' }}
                    >
                      {exp.year}
                    </span>
                  </div>
                </div>

                {/* Timeline Line Column */}
                <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                  {/* Dot with pink pulse glow */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-3 z-10 border border-white/20 shadow-[0_0_10px_var(--glow-accent-lg)] animate-pulse"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  {/* Connector line */}
                  {index < experienceItems.length - 1 && (
                    <div
                      className="absolute top-6 bottom-0 w-px"
                      style={{
                        background: 'linear-gradient(to bottom, var(--accent) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        opacity: 0.4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: 'calc(100% + var(--space-block))',
                      }}
                    />
                  )}
                </div>

                {/* Content Column */}
                <div className="col-span-12 lg:col-span-9 border-l-2 border-white/5 lg:border-l-0 pl-5 lg:pl-0">
                  {/* Role */}
                  <h3
                    className="font-[family-name:var(--font-heading)] text-white mb-4 font-en-heading"
                    style={{ fontSize: 'var(--text-title)' }}
                  >
                    {exp.role}
                  </h3>

                  {/* Company */}
                  <p className="text-[var(--text-body)] text-[var(--accent)] mb-8 font-[family-name:var(--font-body)] font-medium">
                    {exp.company}
                  </p>

                  {/* Description / Responsibilities */}
                  <div className="mb-10">
                    <span className="section-label block mb-4 font-[family-name:var(--font-body)]">
                      {t('experience.description_label')}
                    </span>
                    <ul className="space-y-3.5">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-[family-name:var(--font-body)]"
                        >
                          <span className="text-[var(--accent)] shrink-0 h-[1.625em] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  {exp.skills.length > 0 && (
                    <div>
                      <span className="section-label block mb-3 font-[family-name:var(--font-body)]">
                        {t('experience.skills_label')}
                      </span>
                      <div className="flex flex-wrap gap-2 font-[family-name:var(--font-body)] text-xs text-[var(--text-secondary)]">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full hover:border-[var(--accent)] hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_0_12px_var(--glow-accent)] hover:bg-white/[0.01] font-en-body"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

