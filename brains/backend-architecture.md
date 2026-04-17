# Backend Architecture

## Current status
Next.js API routes serving as the backend. No separate services or job queues.

## Stack
- Next.js 16 API routes (serverless)
- Drizzle ORM with Neon PostgreSQL (`@neondatabase/serverless`)
- Groq SDK for LLM API calls
- Vercel Blob for file storage
- Better Auth for authentication
- Resend for transactional email (magic links)
- `@react-pdf/renderer` for server-side PDF generation

## Services (all in `lib/`)
- `lib/ai/extraction.ts` — Groq Llama 4: image/PDF → structured lab values
- `lib/ai/interpretation.ts` — Groq Llama 4: values → summaries + interpretations + doctor questions
- `lib/ai/chat.ts` — Groq Llama 4: contextual Q&A with report in system prompt
- `lib/auth/index.ts` — Better Auth config with Drizzle adapter + magic link plugin
- `lib/auth/client.ts` — client-side auth wrapper
- `lib/blob/upload.ts` — Vercel Blob upload wrapper (file → buffer → public URL)
- `lib/pdf/doctor-summary.tsx` — React PDF document component for clinical summary

## Processing model
Synchronous — upload, extraction, interpretation, and DB save all happen in a single POST request. No async jobs or queues.

## Graceful degradation
Every external dependency has a fallback:
- No `DATABASE_URL` → mock data from `mocks/`
- No `GROQ_API_KEY` → mock extraction/interpretation
- No `BLOB_READ_WRITE_TOKEN` → fake blob URL
- No `RESEND_API_KEY` → magic link logged to console

## Environment variables
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection |
| `GROQ_API_KEY` | Groq API |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob |
| `RESEND_API_KEY` | Resend email |
| `NEXT_PUBLIC_APP_URL` | Public URL for internal API fetches |
