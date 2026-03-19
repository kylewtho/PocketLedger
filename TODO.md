# TODO

Current roadmap for bringing the starter scaffold up to the product spec.

## Verified Working

- [x] Next.js App Router scaffold with TypeScript
- [x] Tailwind CSS base styling
- [x] `next-themes` integrated at the root layout
- [x] Shared navigation shell for protected routes
- [x] Root login page with PIN form
- [x] Server-action login flow
- [x] Logout action
- [x] Middleware-based route protection for private routes
- [x] Supabase client setup exists
- [x] Supabase migration files exist for `workspaces`, `accounts`, `entries`, and `exchange_rate_cache`
- [x] Seed SQL exists
- [x] Currency formatting and balance helpers exist
- [x] Zod validation file exists
- [x] `npm run lint` passes
- [x] `npx tsc --noEmit` passes
- [x] Runtime types, validation, and SQL migrations align on the target account/entry schema

## Implemented But Still Basic

- [x] Placeholder pages for `/dashboard`, `/accounts`, `/accounts/new`, `/accounts/[id]`, `/entries`, `/entries/new`, `/settings`
- [x] Responsive shell and navigation
- [x] Dark mode support at the app level
- [x] README setup instructions for local env, PIN auth, and Supabase
- [x] Root reference docs:
  - `PRODUCT_SPEC.md`
  - `ARCHITECTURE.md`
  - `DATABASE.md`
  - `COPILOT_NOTES.md`
  - `README.md`

## Next Step: Real Data Flows

### Accounts

- [x] Replace placeholder accounts list with real Supabase data
- [x] Add server-side account create flow with validation
- [x] Add account detail page with computed current balance
- [x] Add account edit flow
- [x] Add archive / unarchive flow
- [x] Align account code with target fields:
  - `name`
  - `currency_code`
  - `initial_balance`
  - `allow_negative`
  - `note`
  - `archived`

### Entries

- [ ] Replace placeholder entries list with real Supabase data
- [ ] Add server-side entry create flow with validation
- [ ] Add entry edit flow
- [ ] Add entry delete flow
- [ ] Support `income`, `expense`, and `adjustment`
- [ ] Enforce comment requirement when resulting balance goes below zero
- [ ] Add basic filtering by account, type, and date

### Dashboard

- [ ] Replace placeholder dashboard cards with live data
- [ ] Show total balance derived from entries
- [ ] Show grouped-by-currency totals
- [ ] Show recent entries
- [ ] Show unified total in selected base currency when FX cache exists

## Follow-Up Product Work

### Settings and Export

- [ ] Add theme switcher UI in settings
- [ ] Persist selected base currency
- [ ] Add CSV export routes/stubs for accounts and entries

### UX Polish

- [ ] Add loading states and skeletons
- [ ] Add error states / error boundaries where needed
- [ ] Improve empty states across dashboard, accounts, and entries
- [ ] Add toast or inline success feedback for create/edit/delete flows
- [ ] Run an accessibility audit on forms and navigation

### Data and Doc Alignment

- [ ] Refresh `.next` route/type artifacts after route changes when needed
- [ ] Update README project structure section to match the current route-group layout exactly
- [x] Align `DATABASE.md` with the schema actually enforced in code
- [x] Align `src/types/database.ts` and `src/lib/validations.ts` with the product-spec target schema

## Verification Targets For The Next Pass

- [ ] Valid PIN creates a session and reaches protected routes
- [ ] Invalid PIN shows inline error
- [ ] Create account succeeds and appears in list
- [ ] Edit account persists
- [ ] Archive action updates account state
- [ ] Create entry succeeds for all three entry types
- [ ] Negative-balance entry without comment is rejected
- [ ] Same negative-balance entry with comment succeeds
- [ ] Dashboard shows non-placeholder totals and recent entries
- [ ] Core pages render sensible loading and empty states
