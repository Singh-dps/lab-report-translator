# API Contracts

## Implemented endpoints

### `POST /api/reports`
Upload a lab report file.
- **Request**: `FormData` with `file` field
- **Response**: `{ reportId: string }`
- **Side effects**: Blob upload, AI extraction, AI interpretation, DB insert

### `GET /api/reports/[id]`
Fetch a report with all values.
- **Response**: `Report` — `{ id, labName, reportDate, patientName, summaryText, values: LabValue[], createdAt }`

### `GET /api/reports/[id]/chat`
Fetch chat message history.
- **Response**: `{ messages: ChatMessage[] }`

### `POST /api/reports/[id]/chat`
Send a chat message, get AI response.
- **Request**: `{ content: string }`
- **Response**: `{ message: ChatMessage }`
- **Side effects**: Saves user message + AI response to DB

### `GET /api/reports/[id]/pdf`
Generate doctor summary PDF.
- **Response**: PDF binary (Content-Type: application/pdf)

### `POST/GET /api/auth/[...all]`
Better Auth catch-all handler for magic link auth.

## Key types (from `types/api.ts`)
- `ValueFlag`: `"low" | "normal" | "high" | "critical"`
- `LabValue`: `{ id, name, value, unit, referenceRangeLow, referenceRangeHigh, flag, category, interpretation, questionsForDoctor: string[] }`
- `Report`: `{ id, labName, reportDate, patientName, summaryText, values: LabValue[], createdAt }`
- `ChatMessage`: `{ id, role: "user" | "assistant", content, createdAt }`

## Not yet implemented
- `GET /api/reports` — list all reports for a user
- Biomarker history/trending endpoints
- Timeline endpoint
- Recommendation endpoint
