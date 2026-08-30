'use client';

import { projects } from '@/data/projects';
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy';
import { useTranslation } from '@/hooks';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="projects"
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
              {t('projects.label')}
            </span>
            <h2
              className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase gsap-reveal"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('projects.title')}
            </h2>
          </div>

          {/* Projects List */}
          <div className="flex flex-col gap-16 sm:gap-20">
            {projects.map((project, index) => (
              <ProjectCaseStudy
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
