# Project Memory Index

## Purpose
Persistent brain for Nidan. Stores durable product, design, technical, and workflow knowledge so future Claude Code sessions can work with continuity.

## How to use this folder
1. Read this file first.
2. Open the topic files relevant to the task.
3. Update the affected docs when decisions change or new durable knowledge appears.

## Project snapshot
- **Product name**: Nidan
- **Stack**: Next.js 16, React 19, Tailwind CSS 4, Drizzle ORM, Neon PostgreSQL, Groq (Llama 4), Vercel Blob, Better Auth, Resend, React PDF
- **Package manager**: pnpm
- **Status**: MVP core implemented — upload, extraction, interpretation, report view, chat, PDF export all working
- **Market**: Indian patients using major diagnostic labs
- **Vision**: Evolve from lab report translator into a personal health OS connecting biomarkers with lifestyle signals

## Files
- `product-overview.md` — product vision, users, value proposition, Indian market focus
- `features.md` — implemented vs. planned features
- `design-system.md` — actual colors, components, typography, patterns in use
- `user-flows.md` — implemented user journeys with technical details
- `information-architecture.md` — route groups, page structure, navigation
- `biomarker-intelligence.md` — AI models, extraction/interpretation logic, categories, flag system
- `data-ingestion.md` — upload pipeline: FormData → Blob → Groq extraction → DB
- `api-contracts.md` — implemented API endpoints with request/response shapes
- `frontend-architecture.md` — Next.js 16 App Router structure, component organization
- `backend-architecture.md` — API routes, AI services, auth, storage
- `database-schema.md` — Drizzle ORM tables and relationships
- `roadmap.md` — MVP status and future phases
- `testing-strategy.md` — current state and planned approach
- `open-questions.md` — unresolved product and technical decisions

## Maintenance rules
- Keep this file short and current.
- Add new files here immediately when created.
- Prefer links to focused docs over bloated all-in-one notes.
