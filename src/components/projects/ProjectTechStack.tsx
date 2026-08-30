'use client';

import { useTranslation } from '@/hooks';

interface ProjectTechStackProps {
  whatIDid: string[];
  techStack: string[];
  features: string[];
  results: string[];
}

export function ProjectTechStack({ whatIDid, techStack, features, results }: ProjectTechStackProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* What I Did */}
      <div className="mb-8">
        <span className="section-label block mb-4 font-[family-name:var(--font-body)]">{t('projects.what_i_did')}</span>
        <ul className="space-y-2">
          {whatIDid.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-[family-name:var(--font-body)] leading-relaxed"
              style={{ fontSize: '15px', color: '#9CA3AF' }}
            >
              <span className="text-[var(--accent)] shrink-0 h-[1.625em] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <span className="section-label block mb-4 font-[family-name:var(--font-body)]">{t('projects.tech_stack')}</span>
        <div className="flex flex-wrap gap-2.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center justify-center text-[11px] font-medium font-[family-name:var(--font-body)] px-4 py-1.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full hover:border-[var(--accent)] hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_0_12px_var(--glow-accent)] hover:bg-white/[0.01] font-en-body"
              style={{ color: '#9CA3AF' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-8">
        <span className="section-label block mb-4 font-[family-name:var(--font-body)]">{t('projects.key_features')}</span>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-[family-name:var(--font-body)] leading-relaxed"
              style={{ fontSize: '15px', color: '#9CA3AF' }}
            >
              <span className="text-[var(--accent)] shrink-0 h-[1.625em] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Results */}
      <div className="mb-8">
        <span className="section-label block mb-4 font-[family-name:var(--font-body)]">{t('projects.results')}</span>
        <div className="space-y-2">
          {results.map((result, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-body)] flex items-center gap-2 leading-relaxed"
              style={{ fontSize: '15px', color: '#9CA3AF' }}
            >
              <span className="text-[var(--accent)] shrink-0">↗</span> {result}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
