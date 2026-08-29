'use client';

import { useEffect, useCallback } from 'react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string | null;
  alt?: string;
  onClose: () => void;
}

export function Lightbox({ isOpen, imageUrl, alt = 'Expanded view', onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
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

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-[family-name:var(--font-body)] bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-lg cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span className="text-xs uppercase tracking-wider">Close</span>
        </button>

        {/* Image Display */}
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto object-contain max-h-[85vh] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
