'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslation } from '@/hooks';
import LineSidebar from '@/components/reactbits/LineSidebar';

interface NavItemConfig {
  href: string;
}

const navConfig: NavItemConfig[] = [
  { href: '#about' },
  { href: '#projects' },
  { href: '#experience' },
  { href: '#other-skills' },
  { href: '#skills' },
  { href: '#certificates' },
  { href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { t } = useTranslation();
  const { locale, setLocale, isEN } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the sidebar with Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const goTo = (href: string) => {
    if (pathname !== '/') {
      if (href === '#hero' || href === '#') {
        router.push('/');
      } else {
        router.push(`/${href}`);
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    goTo('#hero');
  };

  // Sidebar item picked: hide the sidebar, then scroll to the section
  const handleItemClick = (index: number) => {
    setIsMenuOpen(false);
    goTo(navConfig[index].href);
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'th' : 'en');
  };

  const bodyFont = isEN ? 'var(--font-body)' : 'var(--font-thai)';
  const items = navConfig.map((item) => t(`nav.${item.href.replace('#', '').replace(/-/g, '_')}`));

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none select-none px-2 sm:px-0">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-7xl rounded-2xl transition-all duration-500 px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between ${
            isScrolled && !isMenuOpen
              ? 'bg-[#14171F]/50 backdrop-blur-md border border-white/[0.07]'
              : 'bg-transparent border border-transparent backdrop-blur-none'
          }`}
        >
          {/* Left: Brand Outline Text */}
          <a
            href="#hero"
            onClick={handleBrandClick}
            className="group flex items-center cursor-pointer py-1"
            aria-label="Home"
          >
            <span
              className="navbar-brand-stroke font-en-heading text-[18px] sm:text-[22px] tracking-wider uppercase select-none leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
              }}
            >
              THANAKHON
            </span>
          </a>

          {/* Right: Language Switcher + Menu button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleLocale}
              className="px-2 py-1 bg-transparent text-white/40 hover:text-[#F28CA6] text-[11px] sm:text-[12px] font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              style={{ fontFamily: bodyFont }}
              aria-label="Toggle language"
            >
              <span className={locale === 'en' ? 'text-white font-bold' : 'text-white/30'}>EN</span>
              <span className="text-white/20 text-[10px]">|</span>
              <span className={locale === 'th' ? 'text-white font-bold' : 'text-white/30'}>TH</span>
            </button>

            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center gap-2 px-1 py-1 text-white hover:text-[#F28CA6] transition-colors duration-200 cursor-pointer text-[14px] sm:text-[15px] font-semibold tracking-wide focus:outline-none"
              style={{ fontFamily: bodyFont }}
              aria-expanded={isMenuOpen}
              aria-controls="line-sidebar-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span>{isMenuOpen ? (isEN ? 'Close' : 'ปิด') : isEN ? 'Menu' : 'เมนู'}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Blurred (colourless) backdrop — click anywhere outside the menu to close */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Line Sidebar panel — slides in from the right, hides again after a link is chosen */}
      <aside
        id="line-sidebar-menu"
        role="dialog"
        aria-label="Site menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`fixed top-0 right-0 bottom-0 z-40 w-[min(360px,88vw)] pt-24 pb-10 pl-4 pr-6 flex flex-col justify-center drop-shadow-[0_0_14px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ fontFamily: bodyFont }}
      >
        <LineSidebar
          items={items}
          accentColor="#F28CA6"
          textColor="#c4c4c4"
          markerColor="#4a4a4a"
          fontSize={1.5}
          itemGap={26}
          markerLength={56}
          maxShift={20}
          exclusive
          smoothing={160}
          onItemClick={handleItemClick}
        />
      </aside>
    </>
  );
}
