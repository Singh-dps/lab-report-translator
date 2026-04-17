# Open Questions

## Resolved
- **AI provider**: Groq (Llama 4 Scout for extraction, interpretation, and chat)
- **Auth approach**: Magic links via Better Auth + Resend
- **Storage**: Vercel Blob for files, Neon PostgreSQL for data
- **Export format**: One-page PDF with flagged values and doctor questions

## Unresolved
- How should real user sessions connect to the upload flow? (userId is hardcoded to `"mock_user_id"`)
- What should the report history / dashboard look like?
- How should repeat uploads map values to prior biomarkers for trending?
- Which health data sources should be integrated first for lifestyle signals?
- How much of the recommendation engine is rules-based vs. model-based?
- What level of manual correction should users have after AI extraction?
- What privacy and compliance requirements apply (Indian health data regulations)?
- Should onboarding ask symptoms, goals, and lifestyle context before first interpretation?
- How should the app handle extraction failures or low-confidence values?
