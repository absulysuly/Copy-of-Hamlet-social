# Immediate Deployment Action Plan (2025-10-14, 2–3 Hour Sprint)

## Phase 1 – Critical Fixes (Agent 3)
- **Tailwind local build**
  - Install dependencies: `npm install -D tailwindcss postcss autoprefixer`
  - Generate configs: `npx tailwindcss init -p`
  - Update `tailwind.config.js`, ensure content paths include `./index.html`, `./src/**/*.{ts,tsx}` (or relevant).
  - Replace CDN link usage with local `index.css` import.
  - Rebuild to confirm styles render.
- **`.filter()` safeguards**
  - Audit components/services for any `.filter(` usage.
  - Wrap sources with `(array || []).filter(...)` or add default empty arrays when destructuring API responses.
  - Target files: `App.tsx`, `components/`, `services/`, `utils/`.
  - Record findings and fixes in `docs/daily-reports/2025-10-14-agent3.md` with timestamps.
- **Women badge verification**
  - Confirm API data (`gender` / `sex` field) surfaces correctly.
  - Verify badge presence in `components/CandidatePill.tsx`, `components/PostCard.tsx`, `pages/DashboardPage.tsx`, `pages/CandidateProfileView.tsx` (actual file paths to cross-check).
  - Log validation steps and any issues in the daily report.

## Phase 2 – Oversight & QA Prep (Agent 6 & Agent 5)
- **Agent 6**
  - Maintain oversight logs: update `docs/agent-coordination/status.md` at 09:00 & 18:00.
  - Ensure `docs/daily-reports/2025-10-14-agent3.md` exists once Agent 3 starts fixes.
  - Monitor commits for "Oversight Sync – 2025-10-14"; prepare Director Note #1 draft.
- **Agent 5**
  - Update `docs/testing/qa-matrix.md` with smoke test rows for: Tailwind build, filters, women badge, core navigation, candidate view.
  - Tag columns for Pass/Fail, Screenshot Path, Feature Request ID.
  - Coordinate with Agent 3 for retests post-fix.

## Phase 3 – Smoke Tests & Build
- **Agent 3 & Agent 5 together**
  - Run `npm run dev`; verify:
    - Platform loads without Tailwind errors.
    - Filters function across governorate, party, gender.
    - Women badge visible.
    - No crashes on candidate or dashboard views.
  - Perform quick cross-browser snapshots (Chrome, Edge, Firefox) noting layout stability.
  - Update `qa-matrix.md` with initial results.
- **Agent 3**
  - Run `npm run build` to ensure production build succeeds.
  - If errors occur, fix immediately and log in daily report.

## Phase 4 – Deployment & Verification
- **Agent 6**
  - Confirm six "Oversight Sync – 2025-10-14" commits in GitHub.
  - Finalize `docs/agent-coordination/status.md` entry noting readiness for deploy.
- **Agent 3**
  - Deploy via Vercel: `vercel --prod --yes` (ensure Vercel CLI authenticated).
  - Record deployment URL and timestamp in `docs/daily-reports/2025-10-14-agent3.md`.
- **Agent 5**
  - Validate live site (smoke test) and append results to `qa-matrix.md`.

## Phase 5 – Contingencies
- If Tailwind migration fails, revert to previous commit and document blocker in `status.md` under "Director-Hold".
- If `.filter()` audits reveal data issues, raise feature request entries via `docs/agent-coordination/feature-requests.md`.
- If Vercel deploy fails, check build logs; if unresolved within the time window, notify Director with log excerpts.

## Communication Protocol
- All commits include "Oversight Sync – 2025-10-14" in the message.
- Agent 6 coordinates updates via `status.md`; Director reviews at 20:00 UTC.
- Agents 1 & 4 continue marketing prep in parallel but pause if deployment blocks arise.
