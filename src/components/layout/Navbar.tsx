'use client';

import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/data/navigation';
import { useLocale, useTranslation } from '@/hooks';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'th' : 'en');
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      {/* Floating Pill Island */}
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-5xl rounded-2xl transition-all duration-300 border border-white/10 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#101010]/90 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.7)] border-white/15'
            : 'bg-[#141414]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Left: Brand Monogram & Name */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          {/* Monogram Squircle Badge */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center text-black font-serif italic font-black text-sm sm:text-base shadow-sm group-hover:scale-105 transition-transform duration-300">
            T
          </div>
          <span className="font-[family-name:var(--font-heading)] font-en-heading text-sm sm:text-base tracking-[0.16em] text-white group-hover:text-[var(--accent)] transition-colors duration-300">
            THANAKHON
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const key = item.href.replace('#', '').replace(/-/g, '_');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="px-2.5 lg:px-3 py-1.5 rounded-lg text-[11px] lg:text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {t(`nav.${key}`)}
              </a>
            );
          })}
        </div>

        {/* Right: Language Switcher + Hire Me CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 rounded-full border border-white/15 hover:border-white/40 bg-white/5 text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-200 flex items-center gap-1 cursor-pointer"
            aria-label="Toggle language"
          >
            <span className={locale === 'en' ? 'text-white font-bold' : 'opacity-40'}>EN</span>
            <span className="opacity-20 text-[10px]">|</span>
            <span className={locale === 'th' ? 'text-white font-bold' : 'opacity-40'}>TH</span>
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/30 hover:border-[var(--accent)] text-white hover:text-[var(--accent)] text-xs font-medium tracking-wider bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(242,140,166,0.25)] cursor-pointer"
          >
            {t('nav.hire_me') || 'Hire Me'}
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            className="md:hidden p-1.5 text-white hover:text-[var(--accent)] transition-colors focus:outline-none cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5 items-end">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : 'w-3.5'
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Container */}
      <div
        className={`pointer-events-auto md:hidden w-full max-w-5xl overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-[85vh] mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl flex flex-col gap-2">
          {navItems.map((item, index) => {
            const key = item.href.replace('#', '').replace(/-/g, '_');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-300 hover:text-[var(--accent)] hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {t(`nav.${key}`)}
              </a>
            );
          })}

          {/* Mobile Hire Me Button */}
          <div className="pt-2 mt-1 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-200"
            >
              {t('nav.hire_me') || 'Hire Me'}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile backdrop click overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] pointer-events-auto md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </header>
  );
}