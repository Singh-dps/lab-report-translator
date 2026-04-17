# Features

## Implemented (MVP)
- Report upload — drag-and-drop or file picker, PDF/JPG/PNG up to 20MB
- AI extraction — Groq Llama 4 extracts structured lab values from images/PDFs
- AI interpretation — Groq Llama 4 generates 3-sentence summary, per-value interpretations, doctor questions
- Report detail view — summary card, concerning values (expanded), normal values (collapsed by category)
- Value cards — expandable with flag badges (low/normal/high/critical), interpretations, doctor questions
- Chat — contextual AI Q&A about the specific report with conversation history
- PDF export — one-page doctor summary with flagged values and questions
- Auth — magic link via Better Auth + Resend
- File storage — Vercel Blob for uploaded PDFs/images
- Graceful degradation — mock data fallback when DB or API keys missing

## Not yet implemented
- Report history / dashboard (users can't see past reports)
- Real user session wiring (userId hardcoded to `"mock_user_id"` in upload API)
- Biomarker trending across multiple reports
- Health domain scores
- Cross-signal pattern detection (sleep, activity, nutrition)
- Weekly care plan engine
- Family mode
- Clinician/coach dashboard
- Direct lab integrations
- Onboarding flow
- Bottom navigation / app shell

## Monetization levers (planned)
- Freemium report interpretation
- Subscription for trends and advanced intelligence
- Premium vertical modules (hormones, thyroid, performance, longevity)
- B2B dashboard for clinics and coaches
