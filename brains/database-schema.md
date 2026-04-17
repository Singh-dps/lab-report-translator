# Database Schema

## Current status
Drizzle ORM with Neon PostgreSQL. Schema defined in `db/schema.ts`, migrations output to `db/migrations/`.

## Tables

### `user`
- `id` (text, PK)
- `name`, `email` (text, email unique)
- `emailVerified` (boolean)
- `image` (text, nullable)
- `createdAt`, `updatedAt` (timestamp)

### `session` (Better Auth)
- `id` (text, PK)
- `expiresAt`, `ipAddress`, `userAgent` (text)
- `userId` (FK → user)

### `account` (Better Auth)
- `id` (text, PK)
- `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `idToken`, `password`

### `verification` (Better Auth magic link)
- `id`, `identifier`, `value` (text)
- `expiresAt` (timestamp)

### `reports`
- `id` (UUID, PK)
- `userId` (FK → user)
- `labName`, `patientName` (text, nullable)
- `reportDate` (timestamp)
- `rawFileUrl` (text — Vercel Blob URL)
- `parsedData` (JSONB — raw extracted values)
- `summaryText` (text — AI 3-sentence summary)
- `createdAt` (timestamp)

### `values`
- `id` (UUID, PK)
- `reportId` (UUID, FK → reports, cascade delete)
- `name`, `unit`, `category`, `interpretation` (text)
- `value`, `referenceRangeLow`, `referenceRangeHigh` (numeric)
- `flag` (varchar: `low | normal | high | critical`)
- `questionsForDoctor` (JSONB — string array)

### `messages`
- `id` (UUID, PK)
- `reportId` (UUID, FK → reports, cascade delete)
- `role` (varchar: `user | assistant`)
- `content` (text)
- `createdAt` (timestamp)

## Key relationships
- User → many Reports
- Report → many Values (cascade delete)
- Report → many Messages (cascade delete)

## Queries (`db/queries.ts`)
Contains Drizzle query helpers for reports, values, and messages.

## Not yet implemented
- HealthProfile, BiomarkerDefinition, BiomarkerTrendSnapshot entities
- ConnectedDataSource, LifestyleEvent entities
- Recommendation, DoctorSummary as separate entities
