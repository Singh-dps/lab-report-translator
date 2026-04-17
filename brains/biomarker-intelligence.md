# Biomarker Intelligence

## Current status
AI-powered extraction and interpretation implemented via Groq LLMs.

## AI models
- **Extraction**: `meta-llama/llama-4-scout-17b-16e-instruct` — receives base64 image/PDF, returns structured JSON of lab values
- **Interpretation**: `meta-llama/llama-4-scout-17b-16e-instruct` — generates summaries, per-value interpretations, doctor questions
- **Chat**: `meta-llama/llama-4-scout-17b-16e-instruct` — contextual Q&A with report data in system prompt (max 1000 tokens)

## Extraction output
Each value extracted as:
- `name` — test name (e.g., "Thyroid Stimulating Hormone (TSH)")
- `value` — numeric result
- `unit` — measurement unit
- `referenceRangeLow` / `referenceRangeHigh` — normal range bounds
- `flag` — determined by comparing value to range: `low | normal | high | critical`
- `category` — one of the predefined categories below

## Categories
CBC, Lipid Profile, LFT, KFT, Thyroid Profile, Vitamins, Diabetes Profile, Iron Studies, Urine Complete Analysis, Other

## Flag system
- **low** (blue badge) — below reference range
- **normal** (green badge) — within range
- **high** (amber badge) — above reference range
- **critical** (red badge) — dangerously out of range

## Interpretation rules
- Plain language, no medical jargon
- Indian dietary/lifestyle context (e.g., vegetarian B12 sources, common deficiencies)
- No diagnosis or medication recommendations
- Defer to doctors for concerning values
- Generate 1-2 specific doctor questions per abnormal value
- Empty doctor questions for normal values

## Not yet implemented
- Baseline-aware interpretation (comparing to user's prior results)
- Cross-signal correlations (sleep/activity/nutrition)
- Health domain scoring
- Confidence scores for extracted values
