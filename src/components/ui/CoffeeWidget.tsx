'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CoffeeWidget() {
  const { isEN } = useLocale();
  const [count, setCount] = useState<number>(0);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Handle scroll to show widget only after reaching BIOGRAPHY section
  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // Show when the top of the About (Biography) section enters view
        setIsVisible(rect.top <= window.innerHeight * 0.85);
      } else {
        // Fallback for pages without #about
        setIsVisible(window.scrollY > 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch count on mount and sync with localStorage
  useEffect(() => {
    const cachedCount = localStorage.getItem('thanakhon_coffee_count_v2');
    if (cachedCount) {
      setCount(parseInt(cachedCount, 10));
    }

    fetch('/api/coffee')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setCount(data.count);
          localStorage.setItem('thanakhon_coffee_count_v2', data.count.toString());
        }
      })
      .catch((err) => console.error('Failed to fetch coffee count:', err));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Trigger icon bounce animation
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);

    // Optimistically update count
    const nextCount = count + 1;
    setCount(nextCount);
    localStorage.setItem('thanakhon_coffee_count_v2', nextCount.toString());

    // Create floating +1 particle
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left - 10,
      y: e.clientY - rect.top - 20,
    };
    setParticles((prev) => [...prev.slice(-6), newParticle]);

    // Post to API
    fetch('/api/coffee', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setCount(data.count);
          localStorage.setItem('thanakhon_coffee_count_v2', data.count.toString());
        }
      })
      .catch((err) => console.error('Failed to increment count:', err));
  };

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none"
        >
          {/* Floating Transparent Pill Button */}
          <button
            onClick={handleClick}
            aria-label="Get me a coffee"
            className="group relative flex items-center gap-2 px-3.5 py-1.5 bg-neutral-950/40 hover:bg-neutral-900/80 text-white rounded-full border border-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] cursor-pointer transition-all duration-300 active:scale-95 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Expandable Label on Hover */}
            <span
              className="overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[130px] group-hover:opacity-100 transition-all duration-300 ease-out text-[13px] font-medium tracking-tight text-neutral-300 group-hover:pr-1"
              style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
            >
              {isEN ? 'Get me a coffee' : 'เลี้ยงกาแฟผม'}
            </span>

            {/* Icon with click animation */}
            <motion.span
              className="text-lg inline-block origin-center shrink-0"
              animate={isClicking ? { scale: [1, 1.6, 0.85, 1.15, 1], rotate: [0, -15, 15, -8, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              🧋
            </motion.span>

            {/* Counter */}
            <span className="text-[13px] font-bold font-mono text-white tabular-nums shrink-0 pl-0.5">
              {count.toLocaleString()}
            </span>

            {/* Floating +1 Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ opacity: 1, y: 0, scale: 1, x: particle.x }}
                  animate={{ opacity: 0, y: -45, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  onAnimationComplete={() => removeParticle(particle.id)}
                  className="absolute font-bold text-sm font-mono text-[var(--accent)] drop-shadow-md flex items-center gap-0.5"
                >
                  <span>+1</span>
                  <span className="text-xs">🧋</span>
                </motion.div>
              ))}
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
