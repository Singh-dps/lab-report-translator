# Information Architecture

## Current status
Two route groups implemented. No bottom navigation or multi-section app shell yet.

## Route groups

### `app/(marketing)/`
- `/` — Landing page with hero, supported lab list, and upload zone
- Centered layout, no app chrome

### `app/(app)/`
- `/reports/[id]` — Report detail page (summary, values, chat)
- Layout: sticky header with "Nidan" branding + sign-out button
- Leaves right margin for desktop chat drawer

### `app/api/`
- `/api/auth/[...all]` — Better Auth handler
- `/api/reports` — POST upload
- `/api/reports/[id]` — GET report data
- `/api/reports/[id]/chat` — GET/POST chat messages
- `/api/reports/[id]/pdf` — GET doctor summary PDF

## Navigation model
- Currently minimal: landing page → report page (one-way via upload)
- No way to navigate back to past reports
- No bottom navigation, no sidebar navigation

## Planned (not built)
- Home dashboard with report history
- Insights section with biomarker categories and scores
- Timeline with trend exploration
- Profile with preferences and connected sources
- Bottom navigation for primary areas
