# PLAN.md

Project plan for Nidan — phased from current state to full product vision.

> References: [`brains/features.md`](brains/features.md) for feature inventory, [`AGENTS.md`](AGENTS.md) for operating rules and UX principles.

---

## Phase 0 — Groq Migration

Migrate all AI calls from x.ai Grok to Groq (OpenAI-compatible API at `https://api.groq.com/openai/v1`). Vision uses `meta-llama/llama-4-scout-17b-16e-instruct` for images; text-heavy tasks (PDF extraction, interpretation, chat) use `qwen/qwen3-32b` with reasoning disabled. PDFs are parsed to text via `unpdf` before going to the text model.

- [x] Replace `XAI_API_KEY` env var with `GROQ_API_KEY` across codebase
- [x] Update `lib/ai/extraction.ts` — Groq SDK, vision for images, `unpdf` + qwen3-32b for PDFs, now returns `{ metadata, values }`
- [x] Update `lib/ai/interpretation.ts` — qwen3-32b with `<think>` stripping
- [x] Update `lib/ai/chat.ts` — qwen3-32b with `<think>` stripping
- [x] Update `app/api/reports/route.ts` — `GROQ_API_KEY` guard, wired extracted metadata into DB record
- [x] Update `app/api/reports/[id]/chat/route.ts` — `GROQ_API_KEY` guard
- [x] Add `groq-sdk` and `unpdf` to package.json dependencies
- [x] Update all 3 AI files — swap OpenAI SDK imports to Groq SDK
- [x] Update all brain docs (MEMORY, backend-architecture, biomarker-intelligence, data-ingestion, user-flows, features, roadmap, open-questions)
- [x] Run `pnpm install` to fetch groq-sdk
- [x] Test extraction accuracy with sample Indian lab reports on Groq models
- [x] Test interpretation quality and chat responsiveness

---

## Phase 1 — Complete MVP

Wire real user sessions, report history, and remaining MVP gaps. _(from [`brains/features.md`](brains/features.md) "Implemented" + [`brains/roadmap.md`](brains/roadmap.md) unchecked MVP items)_

- [x] Wire real userId from Better Auth session into `POST /api/reports` (now using session.user.id)
- [x] Uncomment and wire `createReportWithValues` DB call in upload route (now active with DB guard; neon-http transaction removed since driver doesn't support it)
- [x] Build `GET /api/reports/list` — list all reports for the authenticated user
- [x] Build report history / dashboard page at `app/(app)/reports/page.tsx` with report list
- [x] Add navigation from dashboard to individual reports and back (Nidan logo → reports, Reports nav link)
- [x] Auth guard on `(app)` routes — redirect unauthenticated users to landing page (production only; dev seeds `dev-user-local` via `lib/auth/current-user.ts`)
- [x] Add sign-out button with proper Better Auth integration
- [x] Extract patient name, lab name, and report date from AI extraction — wired through `ExtractionResult.metadata` into the report record
- [x] Test end-to-end flow: sign in → upload → view → return to dashboard

---

## Phase 2 — Polish & Foundation

Design polish, onboarding, and app shell. _(from [`brains/features.md`](brains/features.md) "Not yet implemented" + [`AGENTS.md`](AGENTS.md) UX principles: mobile-first, summary-first, calm, one-handed)_

- [ ] Bottom navigation / app shell (Home, Upload, Reports, Profile)
- [ ] Onboarding flow — collect basic context before first interpretation
- [ ] Richer design polish and animations (loading states, transitions)
- [ ] Mobile UX audit — thumb-zone actions, swipeable cards, tap target sizes
- [ ] Profile page — account info, preferences, sign-out
- [ ] Error handling improvements — extraction failures, network errors, empty reports
- [ ] Basic trend view — compare same biomarker across multiple report uploads

---

## Phase 3 — Intelligence Layer

Cross-signal insights and health domain scoring. _(from [`brains/features.md`](brains/features.md) V2 vision)_

- [ ] Baseline-aware interpretation (compare current values to user's historical baseline)
- [ ] Health domain scores (metabolic, thyroid, liver, kidney, blood health)
- [ ] Connect sleep/activity/nutrition data sources
- [ ] Cross-signal pattern detection (correlate lifestyle with biomarker changes)
- [ ] Weekly care plan engine — personalized suggestions based on trends
- [ ] Recommendation cards in the UI

---

## Phase 4 — Platform

Multi-user, B2B, and platform capabilities. _(from [`brains/features.md`](brains/features.md) V3 vision)_

- [ ] Family mode — manage reports for multiple people
- [ ] Clinician / coach dashboard
- [ ] Vertical modules (hormones, thyroid, performance, longevity)
- [ ] Direct lab API integrations (Dr Lal PathLabs, Thyrocare, etc.)
- [ ] White-label / B2B platform capabilities
- [ ] Monetization — freemium gating, subscription tiers, premium modules
