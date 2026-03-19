# Copilot Notes

This file contains notes for GitHub Copilot agents working on this codebase.

## Project Overview

PocketLedger is a personal finance tracker. See [PRODUCT_SPEC.md](./PRODUCT_SPEC.md) for full details.

## Current State

- [x] Next.js 14 App Router scaffold
- [x] Tailwind CSS configured
- [x] Base layout with SideNav
- [x] Placeholder pages for all routes
- [x] Reusable UI components (Button, Card, EmptyState, PageHeader)
- [ ] Supabase integration
- [ ] Database schema implementation
- [ ] Account CRUD
- [ ] Entry CRUD
- [ ] Dashboard data
- [ ] PIN auth
- [ ] Theme switcher in Settings

## Conventions

- Use `cn()` from `@/lib/utils` for conditional class names
- UI components live in `src/components/ui/`
- Page-level components live in the corresponding `src/app/` directory
- Mark incomplete sections with `// TODO:` comments
- Use TypeScript strictly — no `any` types unless absolutely necessary

## Key Files

- `src/app/layout.tsx` — Root layout with SideNav and ThemeProvider
- `src/components/navigation/SideNav.tsx` — Sidebar navigation
- `src/lib/utils.ts` — cn() utility
- `src/lib/constants.ts` — App constants

## TODO Markers

Search for `// TODO:` in the codebase to find items pending implementation.

## Upcoming Work

See [TODO.md](./TODO.md) for the full task list.
