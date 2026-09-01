'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/data/navigation';
import { useLocale, useTranslation } from '@/hooks';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);

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

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'th' : 'en');
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none select-none px-2 sm:px-0">
      {/* Floating Island: Seamless & Frameless at top of Hero, pills only on scroll (No shadows) */}
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-7xl rounded-2xl transition-all duration-500 px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#14171F]/50 backdrop-blur-md border border-white/[0.07]'
            : 'bg-transparent border border-transparent backdrop-blur-none'
        }`}
      >
        {/* Left: Brand Monogram Icon Only */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center group cursor-pointer"
          aria-label="Home"
        >
          {/* Monogram Squircle Badge */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center text-black font-serif italic font-black text-xs sm:text-sm group-hover:scale-105 group-hover:bg-[#F28CA6] group-hover:text-white transition-all duration-300 shadow-sm">
            T
          </div>
        </a>

        {/* Center: Desktop Navigation via NavigationMenu (Soft dim text, pink hover #F28CA6, no box) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-3 lg:gap-5">
            {navItems.map((item) => {
              const key = item.href.replace('#', '').replace(/-/g, '_');
              return (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, item.href)}
                    className="px-2 py-1 text-[11px] sm:text-xs font-medium tracking-[0.14em] text-white/40 hover:!text-[#F28CA6] hover:!bg-transparent focus:!bg-transparent focus:!text-[#F28CA6] data-active:!bg-transparent !bg-transparent transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                  >
                    {t(`nav.${key}`)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Language Switcher + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (Borderless & Clean) */}
          <button
            onClick={toggleLocale}
            className="px-2 py-1 bg-transparent text-white/40 hover:text-[#F28CA6] text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
            aria-label="Toggle language"
          >
            <span className={locale === 'en' ? 'text-white font-bold' : 'text-white/30'}>EN</span>
            <span className="text-white/20 text-[10px]">|</span>
            <span className={locale === 'th' ? 'text-white font-bold' : 'text-white/30'}>TH</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="md:hidden p-1.5 text-white/60 hover:text-[#F28CA6] transition-colors focus:outline-none cursor-pointer"
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
        className={`pointer-events-auto md:hidden w-full max-w-7xl overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-[85vh] mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl bg-[#12141C]/90 backdrop-blur-2xl border border-white/[0.08] p-4 flex flex-col gap-1.5">
          {navItems.map((item, index) => {
            const key = item.href.replace('#', '').replace(/-/g, '_');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-xs font-medium tracking-[0.14em] text-white/40 hover:text-[#F28CA6] px-3 py-2 rounded-lg transition-colors duration-200"
                style={{
                  fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {t(`nav.${key}`)}
              </a>
            );
          })}
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