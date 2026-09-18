'use client';

import { useState } from 'react';
import { useTranslation, useLocale } from '@/hooks';

// SVG Icons
function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.15 6.15l1.06-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>);
}
function LineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.952 8.548c0-4.716-4.72-8.548-10.518-8.548C3.617 0 0 3.831 0 8.548c0 4.25 3.76 7.812 8.842 8.456.344.074.812.228.93.522.107.267.07.686.034.956l-.15.903c-.046.267-.211 1.046.915.57 1.127-.476 6.073-3.576 8.286-6.12 1.529-1.675 2.095-3.38 2.095-5.287zM7.706 11.148H5.954a.462.462 0 0 1-.462-.46V6.953a.462.462 0 0 1 .925 0v3.273h1.289a.462.462 0 0 1 0 .922zm1.85-.46a.462.462 0 0 1-.924 0V6.953a.462.462 0 0 1 .925 0v3.735zm4.613 0a.462.462 0 0 1-.31.436.47.47 0 0 1-.152.025.462.462 0 0 1-.375-.192l-1.868-2.542v2.273a.462.462 0 0 1-.924 0V6.953a.462.462 0 0 1 .31-.436.47.47 0 0 1 .152-.026c.15 0 .291.073.374.193l1.869 2.541V6.953a.462.462 0 0 1 .924 0v3.735zm3.005-2.445a.462.462 0 0 1 0 .923h-1.289v.6h1.289a.462.462 0 0 1 0 .922h-1.752a.462.462 0 0 1-.461-.46V6.953a.462.462 0 0 1 .461-.461h1.752a.462.462 0 0 1 0 .922h-1.289v.6h1.289z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

interface ContactLink {
  type: string;
  label: string;
  value: string;
  href: string;
}

const ICON_MAP: Record<string, React.FC> = {
  email: EmailIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  line: LineIcon,
};

const COLOR_MAP: Record<string, string> = {
  email: '#60A5FA',
  phone: '#34D399',
  linkedin: '#38BDF8',
  github: '#C084FC',
  facebook: '#818CF8',
  line: '#4ADE80',
};

// Line QR Modal
function LineQRModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* QR Image only — click stops propagation so only backdrop closes */}
      <img
        src="/images/logos/S__4612100.jpg"
        alt="Line QR Code"
        className="relative z-10 w-[min(80vw,380px)] h-[min(80vw,380px)] object-contain rounded-xl cursor-default"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

export default function Contact() {
  const [imgError, setImgError] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  const { t } = useTranslation();
  const { isEN } = useLocale();

  const links = (t('contact.links', { returnObjects: true }) as ContactLink[]) ?? [];

  return (
    <>
      {/* Line QR Modal */}
      {showLineQR && <LineQRModal onClose={() => setShowLineQR(false)} />}

      <section
        id="contact"
        style={{
          backgroundColor: 'transparent',
          paddingTop: 'clamp(60px, 8vh, 100px)',
          paddingBottom: 'var(--space-section)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

            {/* Avatar with Spinning Text Badge */}
            <div className="flex justify-center items-center relative md:col-span-6">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite] select-none pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <path
                        id="contactTextCircle"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        fill="none"
                      />
                    </defs>
                    <text className="fill-[color:var(--accent)] opacity-60 font-[family-name:var(--font-body)] text-[9.5px] uppercase tracking-[0.25em] font-medium">
                      <textPath href="#contactTextCircle" startOffset="0%">
                        {t('contact.badge')}
                      </textPath>
                    </text>
                  </svg>
                </div>

                <div className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-2 border-white/20 bg-neutral-900 shadow-2xl relative z-10 group backdrop-blur-md">
                  <div className="absolute inset-0 bg-[var(--accent)]/15 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

                  {!imgError ? (
                    <img
                      src="/images/profile/profile-3.jpg"
                      alt="Thanakhon Oonklan - Contact"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-4">
                      <svg className="w-10 h-10 text-white/30 mb-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-[9px] text-[var(--accent)] font-mono uppercase tracking-wider text-center">
                        Ready for Photo
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Text & Social Icons */}
            <div className="flex flex-col justify-center items-center text-center md:col-span-6 md:items-start md:text-left w-full">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9CA3AF] font-mono mb-2 gsap-reveal">
                {t('contact.label')}
              </span>

              <h2
                className="font-en-heading text-[36px] sm:text-[48px] md:text-[56px] tracking-wide text-white leading-[1.05] uppercase mb-4 gsap-reveal"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('contact.title')}
              </h2>

              <p
                className="leading-relaxed max-w-sm sm:max-w-md gsap-reveal mx-auto md:mx-0"
                style={{
                  fontSize: '16px',
                  color: '#9CA3AF',
                  fontFamily: isEN ? 'var(--font-body)' : 'var(--font-thai)',
                  fontWeight: 400,
                  marginBottom: 'clamp(24px, 3.5vh, 40px)',
                }}
              >
                {t('contact.desc')}
              </p>

              {/* Social Icon Row */}
              {links.length > 0 && (
                <div className="flex items-center gap-5 gsap-reveal mb-8 mx-auto md:mx-0">
                  {links.map((link) => {
                    const Icon = ICON_MAP[link.type];
                    const color = COLOR_MAP[link.type] ?? 'var(--accent)';

                    // LINE — show QR modal instead of navigating
                    if (link.type === 'line') {
                      return (
                        <button
                          key={link.type}
                          aria-label="Line QR Code"
                          onClick={() => setShowLineQR(true)}
                          className="text-white/40 transition-all duration-300 hover:scale-125 bg-transparent border-none p-0 cursor-pointer"
                          onMouseEnter={e => (e.currentTarget.style.color = color)}
                          onMouseLeave={e => (e.currentTarget.style.color = '')}
                        >
                          {Icon && <Icon />}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={link.type}
                        href={link.href}
                        aria-label={link.label}
                        target={link.type !== 'phone' ? '_blank' : undefined}
                        rel={link.type !== 'phone' ? 'noopener noreferrer' : undefined}
                        className="text-white/40 transition-all duration-300 hover:scale-125"
                        onMouseEnter={e => (e.currentTarget.style.color = color)}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}
                      >
                        {Icon && <Icon />}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Resume Button */}
              <div className="flex items-center justify-center md:justify-start gsap-reveal">
                <a
                  href={isEN ? '/resume/CV-Thanakhon-Oonklan-EN.pdf' : '/resume/CV-Thanakhon-Oonklan-TH.pdf'}
                  download={isEN ? 'CV-Thanakhon-Oonklan-EN.pdf' : 'CV-Thanakhon-Oonklan-TH.pdf'}
                  className="inline-flex items-center gap-2 px-7 h-11 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full !bg-white !text-black border border-white hover:!bg-transparent hover:!text-white transition-colors duration-300 shadow-md cursor-pointer select-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onClick={() => fetch('/api/visitor/resume', { method: 'POST' }).catch(() => {})}
                >
                  <span>Download Resume</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
