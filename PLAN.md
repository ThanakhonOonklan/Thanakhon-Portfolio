# Audit & UI Refresh Plan

Branch: `chore/audit-and-ui-refresh` (from `main`)

## 1. Audit results (baseline)

| Check | Result |
| :--- | :--- |
| `tsc --noEmit` | ✅ pass |
| `next build` | ✅ pass (10 routes, 3 dynamic API routes) |
| `eslint` | ❌ 10 errors, 14 warnings |

### 1.1 Dead code / unused (to delete)

| Item | Evidence |
| :--- | :--- |
| `src/components/ui/carousel.tsx` | never imported / rendered |
| `src/components/ui/sheet.tsx` | never imported / rendered |
| `src/components/ui/marquee.tsx` | only re-exported in `ui/index.ts` |
| `src/components/ui/button.tsx` | only used by dead carousel/sheet (+ unused import in `About.tsx`) |
| `src/lib/gsap/presets.ts` | empty placeholder |
| `projects/ProjectCard.tsx`, `ProjectGallery.tsx`, `ProjectTechStack.tsx` | only re-exported from barrel; `/projects` page uses its own list markup |
| `global.d.ts` meshline/JSX/`*.glb` declarations | no three.js/meshline code exists (source of 4 `any` lint errors) |
| deps: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, `ogl` | zero imports in `src` |
| deps: `react-icons`, `embla-carousel-react` (`react-github-calendar` is used in About — kept) | zero imports (embla only by dead carousel) |
| unused imports: `SITE_CONFIG` (projects/layout), `Button` (About), `XIcon` (Contact) | eslint warnings |
| `public/google9e9fe83ce2a0b09d.html` | Search Console verification — **keep** (needed) |

### 1.2 Lint errors to fix

- `LocaleProvider.tsx` — `setState` inside effect (2×) → lazy init / `useSyncExternalStore`-style sync
- `SmoothScrollProvider.tsx` — ref read during render → state instead of ref for context value
- `ui/lightbox.tsx` — `setState` inside effect (2×) → derive state
- `api/visitor/leave/route.ts` — `let raw` → `const`
- `global.d.ts` — removed with dead declarations

### 1.3 Concerns (flagged, not all auto-fixed)

1. **`/api/visitor/*` has no abuse protection.** Anyone can POST arbitrary `sessionId` values: unbounded Redis keys (TTL 5 min mitigates), and `redis.keys('visitor:online:*')` is O(N) and blocks Redis — should use `SCAN` or a counter/sorted set. *Action: swap `KEYS` for `SCAN`, validate `sessionId` shape/length.*
2. **Email sender is `onboarding@resend.dev`** — Resend sandbox sender; works only to the account owner's address. Fine for now, fragile.
3. **`ip-api.com` over plain HTTP** (free tier has no HTTPS) and forwards visitor IP to a third party. Only a fallback outside Vercel; *Action: skip fallback in production / document.*
4. **Env vars are asserted with `!`** (`UPSTASH_*`, `RESEND_API_KEY`, `NOTIFY_EMAIL`) and clients are created at module scope — a missing var crashes at import. *Action: guard and return 503 gracefully.*
5. **`<img>` instead of `next/image`** in ~10 places (LCP/bandwidth warnings). 32 MB of `public/`. *Action: convert hero/about first; others tracked as follow-up.*
6. **Personal files committed at repo root** (`SEO-SDLC-Name-Search-Only.md`, `thanakhon_profile_summary.md`, `docs/…Resume….md`). Not secrets as far as seen, but not site code — consider moving out of the repo. *Not touched.*
7. **Untracked images** in `public/images/projects/RalphGuard/` (2 JPGs) — not committed, left as is.
8. `baseline-browser-mapping` data is stale (cosmetic build warning) — `npm i -D baseline-browser-mapping@latest` optional.

## 2. Execution phases

1. **Cleanup** — delete dead files, uninstall unused deps, fix lint errors, harden API routes. Verify: `tsc`, `eslint`, `build`.
2. **UI refresh with React Bits** — install via shadcn registry (`@react-bits/*`, TS + Tailwind variants), applied sparingly so it stays fast:
   - Hero: `Aurora`/`Silk`-style background or `SplitText` headline
   - Section headings: `BlurText` / `ShinyText`
   - Project & certificate cards: `SpotlightCard`
   - Skills: `ScrollVelocity` / `LogoLoop` (replaces dead Marquee)
   - Cursor polish: `SplashCursor` is heavy → skip; use `ClickSpark` only
   - Respect `prefers-reduced-motion`; keep existing pink-neon dark theme tokens.
3. **Verify** — build, run dev server, check desktop + mobile in browser, TH/EN toggle.
4. **Commit** in logical commits (cleanup / fixes / UI). No push/PR unless asked.

## 3. Out of scope

- Content/translation edits, Resume files, Vercel/env configuration.

## 4. Status (end of this branch)

- ✅ Cleanup done: dead UI/components + 8 unused deps removed, all 10 lint errors fixed.
- ✅ API hardened: shared `src/lib/visitor.ts` (lazy clients → 503 instead of import crash, `sessionId` validation, `SCAN` instead of `KEYS`, `ip-api` fallback dev-only).
- ✅ React Bits (vendored in `src/components/reactbits/`, added via shadcn registry `@react-bits`): `ShinyText` on all 7 section headings, `GlareHover` on certificate images (frameless; replaced SpotlightCard, which was removed), Tech Stack icons (frames kept), Experience sliders and Other Skills images (frames removed), `ClickSpark` on the home page. `BlurText` on the Contact description (EN+TH verified; honours `prefers-reduced-motion` via CSS in `animations.css`). Not used on the About bio: it is one long paragraph with **bold** markup, per-word animation would break it.
- ✅ `<img>` → `next/image` for About, Contact, Certificates, Experience (lint warnings now 0). Intentionally kept `<img>` (with eslint-disable + reason): Skills (external skillicons.dev), OtherSkills (unknown dimensions), Lightbox (full-size viewer).
- ✅ Rate limit on `/api/visitor/*` (Redis INCR+EXPIRE per IP: ping 20/min, leave 30/min, resume 10/10min → 429). Verified locally: 30 OK then 429. Note: rate-limit keys share the same Redis; email notification throttle (5 min) is unchanged.
- ✅ Mobile check (375×812): no horizontal scroll, all 7 ShinyText headings fit (36px, no overflow), certificate Lightbox fits viewport, no console errors. Not verified: real-device touch behaviour of ClickSpark (layer is pointer-events:none so taps pass through).
- ✅ Hero background name uses React Bits `TechText` (canvas, Anton font unchanged via `--font-heading`, accent `#F28CA6`, no auto sweep, hover shows the pink selection frame only; letters stay light grey (reveal="none"); old `.hero-background-name*` CSS removed).
- ⏭ Not done: moving personal `.md` files out of repo, Resend custom sender domain.
- ⚠ Not tested: real Redis/Resend paths (no env vars locally) — verify on a Vercel preview.

## 5. Final summary (7 commits on this branch)

| Check | Before | After |
| :--- | :--- | :--- |
| `tsc --noEmit` | pass | pass |
| `eslint` | 10 errors, 14 warnings | **0 errors, 0 warnings** |
| `next build` | pass | pass |
| Dependencies | 29 | 21 (−8 unused, +0 net new; React Bits is vendored source) |

Concern status (section 1.3): #1 API abuse → mitigated (validation + rate limit + SCAN) · #3 ip-api over HTTP → dev-only · #4 `!` env assertions → graceful 503 · #5 `<img>` → done where it pays off · #2 Resend sandbox sender, #6 personal files in repo, #7 (untracked images → committed), #8 stale `baseline-browser-mapping` → **open**.

### Suggested follow-ups
1. Verify visitor email + resume notification on a Vercel preview (needs real env vars).
2. Move personal `.md` files out of the repo (or into `.gitignore`).
3. Verify a domain in Resend and replace the `onboarding@resend.dev` sender.
4. `npm i -D baseline-browser-mapping@latest` to silence the build warning.
5. Optionally apply `SpotlightCard` / `BlurText` to more sections.
