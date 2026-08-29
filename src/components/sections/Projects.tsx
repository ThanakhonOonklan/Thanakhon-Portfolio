'use client';

import { projects } from '@/data/projects';
import { ProjectCaseStudy } from '@/components/projects';
import { useTranslation } from '@/hooks';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      style={{
        backgroundColor: 'var(--bg-primary)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-[var(--space-block)]">
          <span className="section-label block mb-4 gsap-reveal font-[family-name:var(--font-body)]">{t('projects.label')}</span>
          <h2 className="section-title gsap-reveal font-en-heading uppercase">{t('projects.title')}</h2>
        </div>

        {/* Projects List */}
        <div className="flex flex-col" style={{ gap: 'var(--space-section)' }}>
          {projects.map((project, index) => (
            <div key={project.id}>
              <ProjectCaseStudy project={project} index={index} />
              
              {/* Divider between projects */}
              {index < projects.length - 1 && (
                <div
                  className="divider"
                  style={{ marginTop: 'var(--space-section)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
