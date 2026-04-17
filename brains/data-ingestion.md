# Data Ingestion

## Current status
Single-step upload pipeline implemented. No OCR preprocessing or manual correction.

## Implemented pipeline
1. Client sends file as FormData (`POST /api/reports`)
2. File converted to base64, media type detected (PDF or image)
3. File uploaded to Vercel Blob → public URL stored
4. Base64 sent to Groq Llama 4 for structured extraction
5. Extracted values sent to Groq Llama 4 for interpretation
6. Report + values saved to PostgreSQL via Drizzle

## Accepted inputs
- PDF files
- JPG/PNG images
- Max size: 20MB
- Client-side validation before upload

## Storage
- Raw files: Vercel Blob (public URLs)
- Parsed data: `parsedData` JSONB column on reports table
- Individual values: `values` table with full schema

## Graceful degradation
- No `BLOB_READ_WRITE_TOKEN` → returns fake URL
- No `GROQ_API_KEY` → returns mock extraction/interpretation
- No `DATABASE_URL` → returns mock report ID, serves mock data on GET

## Not yet implemented
- Image preprocessing for noisy scans
- Multi-page PDF handling improvements
- Confidence scores per extracted value
- Manual correction UI for OCR errors
- Direct lab API integrations
- Retry/reprocess for failed extractions
