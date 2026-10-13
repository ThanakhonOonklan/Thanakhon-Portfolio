'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslation } from '@/hooks';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui';

interface SubMenuItem {
  title: string;
  href: string;
}

interface NavItemConfig {
  name: string;
  href: string;
  subItems?: SubMenuItem[];
}

const navConfig: NavItemConfig[] = [
  { name: 'About', href: '#about' },
  {
    name: 'Projects',
    href: '#projects',
    subItems: [
      { title: 'RalphGuard', href: '#project-5' },
      { title: 'Thinking Skills Games for Kids', href: '#project-1' },
      { title: 'IoT Equipment System', href: '#project-2' },
      { title: 'ESP32 Robot Controller', href: '#project-3' },
    ],
  },
  {
    name: 'Experience',
    href: '#experience',
    subItems: [
      { title: 'Industrial Robot Control', href: '#experience-0' },
      { title: 'Robotics Engineering', href: '#experience-1' },
      { title: 'Freelance Full Stack Developer', href: '#experience-2' },
      { title: 'Footstep Piezoelectric Energy Harvesting', href: '#experience-3' },
    ],
  },
  { name: 'Other Skills', href: '#other-skills' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

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
        {/* Left: Brand Outline Text */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
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

        {/* Center: Desktop Navigation via NavigationMenu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2 lg:gap-4">
            {navConfig.map((item) => {
              const key = item.href.replace('#', '').replace(/-/g, '_');
              const hasSub = item.subItems && item.subItems.length > 0;

              if (!hasSub) {
                return (
                  <NavigationMenuItem key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className="px-2 py-1 text-[13px] lg:text-[14px] font-medium tracking-[0.1em] text-white/40 hover:!text-[#F28CA6] transition-colors duration-200 cursor-pointer"
                      style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                    >
                      {t(`nav.${key}`)}
                    </a>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.name} className="relative group/dropdown">
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[13px] lg:text-[14px] font-medium tracking-[0.1em] text-white/40 hover:!text-[#F28CA6] group-hover/dropdown:!text-[#F28CA6] transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                  >
                    <span>{t(`nav.${key}`)}</span>
                    <svg
                      className="w-3 h-3 text-white/30 group-hover/dropdown:text-[#F28CA6] transition-transform duration-200 group-hover/dropdown:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </a>

                  {/* Dropdown Floating Card */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 pointer-events-none translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0 transition-all duration-200 z-50">
                    <div className="rounded-xl bg-[#12141C]/95 backdrop-blur-2xl border border-white/10 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.85)] min-w-[250px] flex flex-col gap-0.5">
                      {item.subItems!.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href}
                          onClick={(e) => handleClick(e, sub.href)}
                          className="group/sub flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150 cursor-pointer"
                          style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                        >
                          <span className="font-medium group-hover/sub:text-[#F28CA6] transition-colors truncate">
                            {sub.title}
                          </span>
                          <svg
                            className="w-3 h-3 text-white/20 group-hover/sub:text-[#F28CA6] group-hover/sub:translate-x-0.5 transition-all opacity-0 group-hover/sub:opacity-100 shrink-0 ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
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
            className="px-2 py-1 bg-transparent text-white/40 hover:text-[#F28CA6] text-[11px] sm:text-[12px] font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
            aria-label="Toggle language"
          >
            <span className={locale === 'en' ? 'text-white font-bold' : 'text-white/30'}>EN</span>
            <span className="text-white/20 text-[10px]">|</span>
            <span className={locale === 'th' ? 'text-white font-bold' : 'text-white/30'}>TH</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="md:hidden p-1.5 text-white/60 hover:text-[#F28CA6] transition-colors focus:outline-none cursor-pointer rounded-lg hover:bg-white/[0.05] flex items-center justify-center"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? (
              <svg className="w-5 h-5 text-white/80 hover:text-[#F28CA6] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white/80 hover:text-[#F28CA6] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Container */}
      <div
        className={`pointer-events-auto md:hidden w-full max-w-7xl overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-[85vh] mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl bg-[#12141C]/90 backdrop-blur-2xl border border-white/[0.08] p-4 flex flex-col gap-1.5 max-h-[75vh] overflow-y-auto">
          {navConfig.map((item, index) => {
            const key = item.href.replace('#', '').replace(/-/g, '_');
            const hasSub = item.subItems && item.subItems.length > 0;

            return (
              <div key={item.name} className="flex flex-col">
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-[14px] font-medium tracking-[0.1em] text-white/50 hover:text-[#F28CA6] px-3 py-2 rounded-lg transition-colors duration-200"
                  style={{
                    fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                    transitionDelay: `${index * 20}ms`,
                  }}
                >
                  {t(`nav.${key}`)}
                </a>

                {hasSub && (
                  <div className="pl-4 pr-2 py-0.5 flex flex-col gap-0.5 border-l border-white/10 ml-3 my-0.5">
                    {item.subItems!.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.href}
                        onClick={(e) => handleClick(e, sub.href)}
                        className="text-[13px] text-white/40 hover:text-[#F28CA6] py-1.5 px-2 rounded transition-colors duration-150"
                        style={{ fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)' }}
                      >
                        {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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