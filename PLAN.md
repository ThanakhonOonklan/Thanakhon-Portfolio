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
