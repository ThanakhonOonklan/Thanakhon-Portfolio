## Summary

Audit of the whole site, cleanup of unused code, hardening of the visitor API, and a UI refresh with React Bits components. Full details and the audit checklist are in `PLAN.md`.

### Cleanup
- Removed unused components (`ui/carousel`, `ui/sheet`, `ui/marquee`, `ui/button`, `ProjectCard`, `ProjectGallery`, `ProjectTechStack`, empty `gsap/presets.ts`, stale `global.d.ts`)
- Removed 8 unused dependencies (`three`, `@react-three/*`, `meshline`, `ogl`, `react-icons`, `embla-carousel-react`)
- Fixed all 10 ESLint errors; lint is now **0 errors / 0 warnings**

### Visitor API (`/api/visitor/*`)
- Shared helpers in `src/lib/visitor.ts`: lazy Redis/Resend clients (503 instead of crashing when env vars are missing), `sessionId` validation, `SCAN` instead of `KEYS`
- Per-IP rate limit (ping 20/min, leave 30/min, resume 10 per 10 min → 429)
- `ip-api.com` HTTP fallback is now dev-only

### Images
- `next/image` for profile, certificate and experience images
- Project images renamed to descriptive, numbered names; `Final-Project-1/2` → `ThinkingSkillsGames` / `ESP32-Robot-Controller`
- RalphGuard gallery now shows the two booth photos
- Certificates grouped by orientation (landscape row(s), then portrait) with matching row heights

### UI (React Bits, vendored in `src/components/reactbits/`)
- `GlareHover` on certificates (frameless), Tech Stack icons, Experience sliders and Other Skills images
- `BlurText` on the Contact description (respects `prefers-reduced-motion`)
- `ClickSpark` on the home page
- Image frames removed from Experience and Other Skills

Experiments that were tried and reverted on this branch (TechText hero, LineSidebar menu, hollow headings, CardSwap, morph slider) leave no code behind — **Squash and merge is recommended**.

## Test plan
- [x] `tsc --noEmit`, `eslint`, `next build` pass
- [x] Rate limit verified locally (30 OK, then 429); invalid `sessionId` → 400
- [x] All 53 renamed project image URLs return 200
- [x] Mobile (375px): no horizontal scroll, lightbox fits
- [ ] Visitor email + resume notification on a Vercel preview (needs real env vars)
- [ ] Hover animations (GlareHover, ClickSpark, BlurText) checked by eye in a real browser

🤖 Generated with [Claude Code](https://claude.com/claude-code)
