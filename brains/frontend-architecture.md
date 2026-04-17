# Frontend Architecture

## Current status
Next.js 16 App Router with two route groups, shadcn/ui components, Tailwind CSS 4.

## Stack
- Next.js 16.2.4 (App Router, Server Components)
- React 19.2.4
- Tailwind CSS 4 with `@tailwindcss/postcss`
- shadcn/ui (via `components/ui/`)
- Lucide React icons
- Sonner for toast notifications
- `next-themes` for theme support

## Route groups
- `app/(marketing)/` — public landing page, centered layout
- `app/(app)/` — authenticated app pages, sticky header with branding

## Component organization
- `components/ui/` — shadcn primitives (Badge, Button, Card, Dialog, etc.)
- `components/upload/` — UploadZone, ProcessingScreen
- `components/report/` — ReportHeader, SummaryCard, ConcerningValues, AllValues, ValueCard
- `components/chat/` — ChatDrawer, MessageList, ChatInput

## Key patterns
- Report page is a server component that fetches data via internal API calls
- Upload zone is a client component with local state for file handling
- Chat drawer is a client component managing message state and API calls
- Value cards use client-side expand/collapse (no server round-trips)
- Chat drawer is responsive: sidebar on desktop, FAB + drawer on mobile

## Utilities (`lib/utils.ts`)
- `cn()` — Tailwind class merging (clsx + tailwind-merge)
- `formatDate()` — Indian locale date formatting (DD Mon YYYY)
- `getFlagColor()` / `getFlagLabel()` — flag-to-CSS and flag-to-text helpers
