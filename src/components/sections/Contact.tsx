'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks';
import { SOCIAL_LINKS } from '@/constants';

export default function Contact() {
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="section-bg-gradient"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        {/* Responsive Grid layout */}
        {/* Stacked center on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Avatar with Spinning Text Badge */}
          <div className="flex justify-center items-center relative md:col-span-6">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center">

              {/* Infinite Rotating Circular Text Path SVG */}
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

              {/* Central Circular Avatar */}
              <div className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl relative z-10 group glow-accent backdrop-blur-md">
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--accent)]/15 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

                {/* The Avatar Image */}
                {!imgError ? (
                  <img
                    src="/images/profile/profile-3.jpg"
                    alt="Thanakhon Oonklan - Contact"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  /* Fallback */
                  <div className="w-full h-full bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-4">
                    <svg className="w-10 h-10 text-white/30 mb-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[9px] text-[var(--accent)] font-[family-name:var(--font-body)] uppercase tracking-wider text-center">
                      Ready for Photo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Text & Social Links — always centered on mobile */}
          <div className="flex flex-col justify-center items-center text-center md:col-span-6 md:items-start md:text-left w-full">
            <span className="section-label block mb-4 font-[family-name:var(--font-body)] text-[var(--accent)] font-semibold tracking-[0.2em] gsap-reveal">
              {t('contact.label')}
            </span>

            {/* Bold Heading */}
            <h2
              className="font-[family-name:var(--font-heading)] text-white mb-6 tracking-wide gsap-reveal font-en-heading"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              {t('contact.title')}
            </h2>

            <p
              className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] mb-10 sm:mb-14 max-w-sm sm:max-w-md leading-relaxed gsap-reveal mx-auto md:mx-0"
              style={{ fontSize: 'var(--text-body)' }}
            >
              {t('contact.desc')}
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 justify-center md:justify-start gsap-reveal">

              {/* Email */}
              <a
                href={SOCIAL_LINKS.email}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg glow-accent backdrop-blur-sm"
                title="Email"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg glow-accent backdrop-blur-sm"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg glow-accent backdrop-blur-sm"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg glow-accent backdrop-blur-sm"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg glow-accent backdrop-blur-sm"
                title="GitHub"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
