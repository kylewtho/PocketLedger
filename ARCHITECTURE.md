# PocketLedger Architecture

## Stack

### Current Repository Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres
- Zod
- next-themes

### Intended MVP Additions

- React Hook Form for ergonomic form state
- TanStack Query for client-side query caching where interactive fetching is needed

These additions are part of the intended application architecture, but they are not required for every screen and may not be installed yet in the current repository state.

## High-Level Structure

### Frontend

The frontend is a Next.js App Router application with:

- route-based pages under `src/app/`
- reusable UI components under `src/components/`
- client components for forms, toggles, and interactive controls
- server components where appropriate for layout and data loading

### Backend

The application uses:

- Supabase Postgres for persistent storage
- Next.js route handlers or server actions for protected mutations
- middleware for route protection
- cookies for simple session access

### Auth / Access

Current access is intentionally not full user auth.
Instead:

- user enters a shared numeric PIN
- server verifies the PIN
- server sets a secure cookie-backed session
- middleware blocks protected pages if the session is missing or invalid

The PIN must never be treated as trusted client-side state or exposed in frontend code.

## Intended App Sections

- Login
- Dashboard
- Accounts
- Entries
- Settings

## Data Model Direction

### Workspace

The MVP assumes a single shared workspace.
All accounts and entries belong to that workspace so the schema can evolve later to support:

- workspace membership
- per-user identity
- role-based access

### Accounts

Each account should support:

- name
- currency code
- initial balance
- allow negative flag
- short note
- archived status

### Entries

Each entry should support:

- account reference
- type: income, expense, or adjustment
- amount
- comment
- datetime

### Balance Source of Truth

Balance should be derived from:

`initial_balance + sum(entry effects)`

Where:

- income adds
- expense subtracts
- adjustment can add or subtract

The system should not rely on a stored running balance as the canonical source of truth.

## Data Flow

1. User opens the site.
2. Middleware checks for a valid session cookie.
3. If no session exists, the request redirects to the login page.
4. User submits the shared PIN.
5. Server verifies the PIN and sets a secure cookie session.
6. Protected pages load workspace, account, and entry data.
7. Dashboard computes grouped totals or unified totals depending on display mode.

## Currency Conversion Flow

1. User selects display mode and, if needed, a base currency.
2. The client requests conversion data from an internal API route or server action.
3. The server checks the exchange-rate cache table first.
4. If cached data is stale or missing, the server fetches fresh rates from the configured provider.
5. The server upserts the latest rates and timestamp into the cache table.
6. The response returns rates and `last updated` metadata.
7. The UI computes unified totals from account balances and the returned rates.

## Suggested Folder Direction

The current repository already follows this general structure:

```text
src/
├── app/                    # Routes, layouts, pages
│   ├── accounts/
│   ├── dashboard/
│   ├── entries/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── navigation/
│   └── ui/
├── lib/
│   ├── constants.ts        # App constants and config
│   ├── currency.ts         # Balance + currency helpers
│   ├── supabase.ts         # Supabase client helpers
│   ├── utils.ts            # Shared utility helpers
│   └── validations.ts      # Zod schemas
├── styles/
│   └── globals.css
└── types/
    └── database.ts

supabase/
└── migrations/             # SQL schema migrations
```

Recommended additions as the app grows:

- `src/lib/auth/` for PIN verification, cookie session helpers, and middleware utilities
- `src/lib/rates/` for FX provider access, cache lookup, and normalization
- `src/components/forms/` for account and entry form components
- `src/app/api/` for login, logout, and exchange-rate routes if route handlers are preferred

## Architectural Decisions

### Why Shared Workspace First

This keeps the MVP simple while leaving room to add:

- workspace membership
- per-user attribution
- stronger auth

### Why Not Store Running Balances as Primary Truth

Running balances are fragile and harder to audit.
The source of truth should remain:

- account initial balance
- entry history

Derived totals can be computed in SQL, server utilities, or presentation helpers.

### Why Server-Side PIN Verification

The shared PIN is a coarse access mechanism and must still be handled securely.
Verifying it on the server:

- prevents exposing the real PIN in client code
- allows secure cookie issuance
- centralizes rate limiting and session rules

### Why Server-Side FX Fetching

This avoids coupling the client directly to external rate providers and makes it easier to:

- cache responses
- rotate providers
- validate payloads
- add provider-specific retry logic later

## Current Repository Notes

- Supabase migrations already exist for `workspaces`, `accounts`, `entries`, and `exchange_rate_cache`.
- The product, architecture, and database documents are aligned to the current MVP direction.
- The current repository includes starter auth middleware, PIN login/logout routes, exchange-rate route stubs, and CSV export route stubs.
- The current codebase includes Zod, but React Hook Form and TanStack Query are still architectural recommendations rather than confirmed dependencies.

## Upgrade Paths

### Auth Upgrade

Future versions can replace the shared PIN with:

- Supabase Auth
- magic link
- email OTP
- role-based workspace members

### Reporting Upgrade

Future versions can add:

- monthly trends
- grouped reporting
- historical FX valuation

### Data Integrity Upgrade

Future versions can add:

- entry edit history
- soft deletes
- audit tables
- stronger workspace-scoped access controls
