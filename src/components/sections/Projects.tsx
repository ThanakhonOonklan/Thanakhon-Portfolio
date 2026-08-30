'use client';

import { projects } from '@/data/projects';
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy';
import { useTranslation, useLocale } from '@/hooks';

export default function Projects() {
  const { t } = useTranslation();
  const { isEN } = useLocale();

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

          {/* View More Projects Button */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <a
              href="/projects"
              className="flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
              style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)', fontSize: '14px', color: '#9CA3AF' }}
            >
              <span>{isEN ? 'View All Projects' : 'ดูโครงการเพิ่มเติม'}</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
