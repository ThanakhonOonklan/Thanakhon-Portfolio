# Thanakhon Portfolio — Developer & Agent Documentation (`agent.md`)

Welcome to the developer handoff and architectural map for **Thanakhon Oonklan's Portfolio Website**. This document contains a comprehensive breakdown of the design system, typography hierarchy, multi-language architecture, layout configurations, GSAP animations, and Magic UI component integration.

---

## 1. Project Directory Structure

The project is built on **Next.js (App Router)**, styled using **Tailwind CSS v4** with design tokens, and animated with **GSAP & Lenis Smooth Scroll** and **Magic UI (Motion)**.

```text
Thanakhon-Portfolio/
├── public/                 # Static Assets (Images, Project Screenshots, Profile Portraits)
│   └── images/
│       ├── profile/        # Profile photos (Hero, About, Contact)
│       └── projects/       # Screenshots for project galleries
├── src/
│   ├── app/                # Next.js App Router Pages & Core Layout
│   │   ├── globals.css     # Entry point for stylesheet & Design System Tokens
│   │   ├── layout.tsx      # Main layout (Google Fonts, SEO metadata, AppProviders)
│   │   └── page.tsx        # Single-page index assembling all sections
│   ├── components/
│   │   ├── layout/         # Header, Navbar, Footer
│   │   ├── projects/       # ProjectCaseStudy, ProjectGallery, ProjectTechStack
│   │   ├── sections/       # Modular sections (Hero, About, Projects, Experience, Skills, OtherSkills, Certificates, Contact)
│   │   └── ui/             # Reusable UI components (Button, Marquee, Lightbox, PortraitFallback)
│   ├── constants/          # Site constants & social links
│   ├── data/               # Project data, skills data, certificates data, navigation
│   ├── hooks/              # Custom hooks (useLocale, useTranslation, etc.)
│   ├── lib/
│   │   ├── gsap/           # GSAP plugin registration & presets
│   │   ├── i18n/           # i18next initialization
│   │   └── utils.ts        # Helper functions (cn utility)
│   ├── messages/           # Translation Dictionaries (JSON formats)
│   │   ├── en.json         # English translations
│   │   └── th.json         # Thai translations
│   ├── providers/          # React Context Providers (SmoothScrollProvider, LocaleProvider, AppProviders)
│   ├── styles/             # Modular stylesheets
│   │   ├── animations.css  # CSS keyframes & dynamic animations (progress bar, float, pulse)
│   │   ├── typography.css  # Typography rules, Sarabun Thai override, font-en utilities
│   │   └── utilities.css   # Reusable utility classes (.section-container, .section-label, etc.)
│   └── types/              # TypeScript interfaces (Project, Skill, Certificate, Locale, etc.)
├── agent.md                # Architectural documentation
└── package.json            # Dependencies and scripts
```

---

## 2. Design System & Theme Colors

The portfolio features a **Cinematic Editorial Dark Theme** with soft pink neon accents.

### Design Tokens (`src/app/globals.css`)

| CSS Variable | Value | Purpose / Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#0F0F0F` | Main window background |
| `--bg-secondary` | `#151515` | Alternate background rows (About, Experience, Contact) |
| `--bg-elevated` | `#1B1B1B` | Containers, elevated cards, image viewers |
| `--bg-surface` | `#212121` | Interactive elements, active surfaces |
| `--accent` | `#F28CA6` | Soft Pink neon accent / highlights |
| `--accent-hover` | `#FFB3C7` | Hover state for accent elements |
| `--text-primary` | `#F5F5F5` | Dominant headings and titles |
| `--text-secondary`| `#A0A0A0` | Body copy and descriptions |
| `--text-muted` | `#555555` | Labels, inactive links, scroll cues |
| `--border` | `rgba(255,255,255,0.08)` | Element borders and dividers |
| `--glass-bg` | `rgba(255,255,255,0.03)` | Glassmorphic element background |
| `--glass-border` | `rgba(255,255,255,0.08)` | Glassmorphic border |

---

## 3. Typography System Rules

- **Heading Font:** `var(--font-heading)` maps to **Anton** (`next/font/google`).
- **English Body Font:** `var(--font-body)` maps to **Inter** (`next/font/google`).
- **Thai Body Font:** `var(--font-thai)` maps to **Sarabun** (`next/font/google`).

### Key Rules:
1. **Headings:** Always use `font-en-heading` or `var(--font-heading)` (Anton) for English titles and section displays.
2. **Thai Content:** Paragraphs, lists, buttons, and links automatically use Sarabun when `<html>` has `lang="th"`.
3. **Forced English Elements:** Apply `.font-en-heading` or `.font-en-body` on elements that should stay in Anton/Inter regardless of language.

---

## 4. UI Components & Magic UI Integration

All reusable UI components are organized under `src/components/ui/` and exported via `src/components/ui/index.ts`:

- `<Button />` — Tailwind-styled interactive button (shadcn style)
- `<Marquee />` — Magic UI infinite scrolling container (powered by Motion + CSS keyframes)
- `<Lightbox />` — Fullscreen modal image viewer with Escape key listener and body scroll lock
- `<PortraitFallback />` — Cyberpunk abstract geometric fallback when profile photos fail to load

### Adding New Magic UI Components
To install new Magic UI components, always use:
```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>"
```
*Example:*
```bash
npx shadcn@latest add "https://magicui.design/r/blur-fade"
npx shadcn@latest add "https://magicui.design/r/border-beam"
```
After adding a component, export it from `src/components/ui/index.ts` for clean import paths.

---

## 5. Multi-Language (Locale) Architecture

1. **Provider:** `src/providers/LocaleProvider.tsx` manages language state (`'en'` / `'th'`) and persists choices to `localStorage`.
2. **Hook:** `useLocale()` or `useTranslation()` from `@/hooks`.
3. **Dictionaries:** `src/messages/en.json` and `src/messages/th.json`.
4. **DOM Sync:** Automatically updates `<html lang="en|th">` on language toggle.

---

## 6. Animation Architecture (GSAP & Lenis)

- **Smooth Scrolling:** Handled globally by `Lenis` in `src/providers/SmoothScrollProvider.tsx`, synced with GSAP's ticker.
- **GSAP Registration:** Single global registration point via `registerGSAP()` in `src/lib/gsap/register.ts`.
- **Scroll Triggers:** Components use `.gsap-reveal` with `useGSAP` or GSAP timelines.
