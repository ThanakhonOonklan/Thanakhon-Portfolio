'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ProjectGalleryProps {
  projectNumber: string;
  images?: string[];
  imageUrl?: string;
  uiPreviewUrl?: string;
}

export function ProjectGallery({ projectNumber, images = [], imageUrl, uiPreviewUrl }: ProjectGalleryProps) {
  // Merge images: deduplicate, prefer the images[] array
  const allImages = images.length > 0
    ? images
    : [imageUrl, uiPreviewUrl].filter(Boolean) as string[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Track which images have been fully loaded into browser cache
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set([0]));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload ALL images immediately when component mounts
  // so switching is instant (no network fetch on click)
  useEffect(() => {
    if (allImages.length <= 1) return;
    allImages.forEach((src, i) => {
      if (i === 0) return; // index 0 already rendered
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedSet(prev => new Set(prev).add(i));
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 200);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % allImages.length);
  }, [activeIndex, allImages.length, goTo]);

  // Auto-play: advance every 3.5s unless hovered
  useEffect(() => {
    if (allImages.length <= 1) return;
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, goNext, allImages.length]);

  if (allImages.length === 0) {
    // Placeholder when no images
    return (
      <div>
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-[family-name:var(--font-heading)] text-[var(--text-muted)]"
              style={{ fontSize: 'var(--text-display)' }}
            >
              {projectNumber}
            </span>
          </div>
        </div>
        <div
          className="relative -mt-12 ml-8 lg:ml-16 w-2/3 max-w-[400px] min-w-0 overflow-hidden shadow-2xl"
          style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--text-caption)] text-[var(--text-muted)] font-[family-name:var(--font-body)] uppercase tracking-widest">
              UI Preview
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Main Image Viewer ── */}
      <div
        className="relative w-full overflow-hidden group"
        style={{
          aspectRatio: '16 / 10',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Active Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={activeIndex}
          src={allImages[activeIndex]}
          alt={`Project ${projectNumber} — image ${activeIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Loading indicator — shown only if image hasn't been preloaded yet */}
        {!loadedSet.has(activeIndex) && !isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-elevated)]/60 backdrop-blur-sm pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--accent)] rounded-full animate-spin" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Image counter badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] text-white/70 font-[family-name:var(--font-body)] tracking-wider uppercase">
          {activeIndex + 1} / {allImages.length}
        </div>

        {/* Prev / Next arrows — appear on hover */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo((activeIndex - 1 + allImages.length) % allImages.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Auto-play progress bar */}
        {allImages.length > 1 && !isHovered && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              key={`${activeIndex}-bar`}
              className="h-full bg-[var(--accent)] origin-left"
              style={{ animation: 'progressBar 3.5s linear forwards' }}
            />
          </div>
        )}
      </div>

      {/* ── Thumbnail Strip (UI Preview) ── */}
      {allImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 relative overflow-hidden transition-all duration-200 border-2 ${
                i === activeIndex
                  ? 'border-[var(--accent)] opacity-100 scale-[1.03]'
                  : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
              }`}
              style={{ width: 80, aspectRatio: '16 / 10' }}
              aria-label={`View image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Progress dots for small counts */}
      {allImages.length > 1 && allImages.length <= 8 && (
        <div className="flex items-center gap-1.5 mt-3 ml-1">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-4 h-1.5 bg-[var(--accent)]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

