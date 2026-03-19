# TODO

Ordered list of upcoming implementation tasks.

## Phase 1: Foundation (Current)
- [x] Next.js scaffold with TypeScript
- [x] Tailwind CSS + dark mode
- [x] Base layout + navigation
- [x] Placeholder pages
- [x] Reusable UI components

## Phase 2: Database & Data Layer
- [ ] Set up Supabase project
- [ ] Create database schema (see DATABASE.md)
- [ ] Implement Supabase client (`src/lib/supabase.ts`)
- [ ] Define TypeScript types for Account and Entry

## Phase 3: Account Management
- [ ] Account list page with real data
- [ ] New account form with validation (Zod + react-hook-form)
- [ ] Account detail page with entry list
- [ ] Edit account form
- [ ] Archive account action

## Phase 4: Entry Management
- [ ] Entry list page with filtering (by account, type, date)
- [ ] New entry form with validation
- [ ] Edit entry form
- [ ] Delete entry action

## Phase 5: Dashboard
- [ ] Fetch and display total balance
- [ ] Monthly income/expense summary
- [ ] Recent transactions list
- [ ] Simple charts (recharts or chart.js)

## Phase 6: Settings & Auth
- [ ] Theme switcher (dark/light/system)
- [ ] PIN setup and verification
- [ ] PIN-protected route middleware
- [ ] CSV export

## Phase 7: Polish
- [ ] Loading states and skeletons
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Mobile responsive navigation (drawer)
- [ ] Accessibility audit
