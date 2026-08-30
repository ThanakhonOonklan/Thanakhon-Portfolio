'use client';

import { useEffect, useCallback, useState } from 'react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl?: string | null;
  images?: string[];
  initialIndex?: number;
  alt?: string;
  onClose: () => void;
}

export function Lightbox({
  isOpen,
  imageUrl,
  images = [],
  initialIndex = 0,
  alt = 'Expanded view',
  onClose,
}: LightboxProps) {
  const allImages: string[] =
    images.length > 0 ? images : imageUrl ? [imageUrl] : [];

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setActiveIndex(initialIndex);
  }, [isOpen, initialIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || allImages.length === 0) return null;

  const currentSrc = allImages[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/92 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-[family-name:var(--font-body)] bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-lg cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span className="text-xs uppercase tracking-wider hidden sm:inline">Close</span>
        </button>

        {/* Counter */}
        {allImages.length > 1 && (
          <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[11px] text-white/70 font-[family-name:var(--font-body)] tracking-wider select-none">
            {activeIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Image */}
        <img
          src={currentSrc}
          alt={`${alt} ${activeIndex + 1}`}
          className="w-full h-auto object-contain max-h-[82vh] rounded-lg shadow-2xl select-none"
          draggable={false}
        />

        {/* Prev / Next arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/90 hover:border-white/30 transition-all duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/90 hover:border-white/30 transition-all duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot navigation */}
        {allImages.length > 1 && allImages.length <= 12 && (
          <div className="flex items-center gap-1.5 mt-4">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? 'w-4 h-1.5 bg-[var(--accent)]'
                    : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
