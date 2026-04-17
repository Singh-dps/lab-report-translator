# Design System

## Current status
Implemented with Tailwind CSS 4, shadcn/ui, and Lucide icons.

## Colors
- **Primary**: teal `#0F766E`
- **Background**: off-white `#FAFAF7`
- **Flag colors**: blue (low), green (normal), amber (high), red (critical)
- Semantic health colors used on badges, card borders, and value indicators

## Typography
- Geist font family via `next/font`
- Large readable type for health data

## Component library
shadcn/ui components in `components/ui/`: Badge, Button, Card, Dialog, Input, Textarea, Collapsible, ScrollArea, Separator, Skeleton, Sonner (toast)

## Icons
Lucide React — used throughout for UI actions, status indicators, and decorative elements (Sparkles for AI, ChevronDown for expand, Send for chat, etc.)

## Layout patterns
- Card-based UI for values and summaries
- Expandable/collapsible sections for progressive disclosure
- Sticky header with branding and sign-out
- Chat drawer: fixed sidebar on desktop (400-450px), FAB + slide-in on mobile
- Single-column content layout

## Content tone
- Plain English with Indian dietary/lifestyle references
- Calm, supportive, not alarmist
- Frames output as education and discussion support, never diagnosis
- Encourages clinician discussion for concerning values
