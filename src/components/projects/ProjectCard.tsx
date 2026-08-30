'use client';

import { useState } from 'react';
import type { Project } from '@/types';
import { Lightbox } from '@/components/ui/lightbox';
import { useLocale } from '@/hooks';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

// GitHub SVG icon
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// External link icon
function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

export function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  const { isEN } = useLocale();

  const subtitle = isEN && project.subtitleEn ? project.subtitleEn : project.subtitle;
  const allImages = project.images && project.images.length > 0 ? project.images : [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasThumbnail = allImages.length > 0;
  const thumbnailSrc = hasThumbnail ? allImages[0] : null;

  function handleImageClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (allImages.length > 0) {
      setLightboxIndex(0);
      setLightboxOpen(true);
    }
  }

  return (
    <>
      {/* Card */}
      <article
        className="group relative flex flex-col rounded-xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-400 hover:shadow-[0_0_32px_rgba(0,0,0,0.6)]"
        style={{ '--accent-glow': 'var(--glow-accent)' } as React.CSSProperties}
      >
        {/* ── Image Thumbnail ── */}
        <div
          className={`relative overflow-hidden ${hasThumbnail ? 'cursor-zoom-in' : ''}`}
          style={{ aspectRatio: '16 / 9' }}
          onClick={hasThumbnail ? handleImageClick : undefined}
        >
          {hasThumbnail ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailSrc!}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                draggable={false}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-xs font-[family-name:var(--font-body)] tracking-wider uppercase bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  View {allImages.length} photo{allImages.length !== 1 ? 's' : ''}
                </div>
              </div>
              {/* Image count badge */}
              {allImages.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5 text-[10px] text-white/70 font-[family-name:var(--font-body)] tracking-wider select-none">
                  1 / {allImages.length}
                </div>
              )}
            </>
          ) : (
            // No image placeholder
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-surface)]">
              <span
                className="font-[family-name:var(--font-heading)] text-[var(--text-muted)] font-en-heading select-none"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', opacity: 0.3 }}
              >
                {projectNumber}
              </span>
            </div>
          )}
        </div>

        {/* ── Card Content ── */}
        <div className="flex flex-col flex-1 p-5 gap-4">

          {/* Number + Category */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-[var(--text-muted)] font-[family-name:var(--font-body)] tracking-widest font-en-body select-none">
              {projectNumber}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{
                color: 'var(--accent)',
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-white font-[family-name:var(--font-heading)] font-en-heading uppercase leading-tight tracking-wide"
            style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="leading-relaxed font-[family-name:var(--font-body)] line-clamp-3 flex-1"
            style={{ fontSize: '14px', color: '#9CA3AF' }}
          >
            {subtitle}
          </p>

          {/* Tech Stack pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center text-[10px] font-medium px-2.5 py-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full font-[family-name:var(--font-body)] font-en-body transition-all duration-200 hover:border-[var(--accent)]/50 hover:text-white cursor-default"
                style={{ color: '#9CA3AF' }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 6 && (
              <span
                className="inline-flex items-center text-[10px] px-2.5 py-1 rounded-full border border-dashed border-white/15 font-[family-name:var(--font-body)] cursor-default"
                style={{ color: '#9CA3AF' }}
              >
                +{project.techStack.length - 6} more
              </span>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] mt-auto">
            {/* GitHub link */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-white transition-colors duration-200"
                aria-label="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon className="w-4 h-4" />
                <span className="text-[11px] font-[family-name:var(--font-body)] tracking-wider uppercase hidden sm:inline">GitHub</span>
              </a>
            ) : (
              <span />
            )}

            {/* Details button + Live link */}
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-body)] font-en-body transition-colors duration-200"
                  style={{ color: 'var(--accent)' }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live demo"
                >
                  <ExternalIcon className="w-3 h-3" />
                  Live
                </a>
              )}
              <button
                onClick={() => onOpenDetails(project)}
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] font-[family-name:var(--font-body)] font-en-body px-3 py-1.5 rounded border border-white/15 text-white/70 hover:text-white hover:border-white/35 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                Details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={allImages}
        initialIndex={lightboxIndex}
        alt={project.title}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
