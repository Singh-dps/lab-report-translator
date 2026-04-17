# Testing Strategy

## Current status
No test suite. Graceful degradation with mock data serves as the primary dev-time safety net.

## Mock data (`mocks/`)
- `mocks/reports.ts` — realistic Thyrocare report for "Rahul Sharma" with 15 values (mix of normal, high, low — Vitamin D deficiency, elevated TSH, pre-diabetic HbA1c)
- `mocks/chat.ts` — 4-message sample conversation about cholesterol and doctor questions
- API routes return mock data when `DATABASE_URL` is missing, allowing frontend development without backend setup

## Testing areas to build
- AI extraction accuracy across lab report formats and quality levels
- Interpretation correctness and safety (no diagnostic claims)
- Upload validation edge cases (corrupt files, oversized, wrong type)
- Chat context handling with long conversation histories
- PDF rendering with various value counts and edge cases
- Mobile responsiveness and touch interactions
- Auth flow end-to-end
