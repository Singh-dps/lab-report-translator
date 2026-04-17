# User Flows

## Upload to insight (implemented)
1. User lands on marketing page with upload zone
2. Drags/selects PDF or image (validated: PDF/JPG/PNG, <20MB)
3. Clicks "Analyze this report"
4. Processing screen shows 4 animated stages (~10s total)
5. Backend: file → Vercel Blob → Groq extraction → Groq interpretation → DB
6. Redirect to `/reports/[id]`

## Report exploration (implemented)
1. Report page loads with patient info header
2. AI summary card shows 3-sentence plain-language overview
3. Concerning values section (expanded) shows flagged tests with color-coded badges
4. Each value card expands to reveal interpretation + doctor questions
5. Normal values section (collapsed) groups tests by category

## Chat Q&A (implemented)
1. Desktop: chat sidebar always visible; Mobile: FAB opens slide-in drawer
2. Quick-action buttons if no messages: "What should I ask my doctor?" / "Is anything concerning?"
3. User sends message → Groq responds with report-aware context
4. Full conversation history maintained in DB

## Doctor prep / PDF export (implemented)
1. User clicks "Generate doctor summary" in report header
2. `GET /api/reports/[id]/pdf` renders React PDF with flagged values
3. Browser downloads one-page clinical summary with questions to discuss

## Auth (implemented)
1. User enters email → magic link sent via Resend
2. Click link → session created in PostgreSQL
3. Dev fallback: magic link logged to console if no Resend key

## Not yet implemented
- Report history / browsing past uploads
- Repeat monitoring (trend comparison across reports)
- Lifestyle connection (sleep/activity/nutrition data)
