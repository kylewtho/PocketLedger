# PocketLedger

PocketLedger is a minimalist web app for tracking account balances and simple financial entries across multiple currencies.

## Planned Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn UI
- Supabase
- Vercel

## MVP Features

- Shared PIN-protected access
- Dashboard with total balance
- Multiple accounts
- Multiple currencies
- Income / expense / adjustment entries
- Negative balance support
- Dark / light mode
- Exchange-rate conversion display
- CSV export stubs

## Current Repository State

- Starter Next.js App Router scaffold exists
- Shared UI components and route placeholders exist under `src/`
- Responsive app shell includes a mobile navigation drawer
- Product and architecture docs are aligned to the current MVP
- SQL migrations and seed data follow the current starter schema direction
- PIN login, middleware protection, exchange-rate route stubs, and CSV export stubs are in place

## Notes

- Treat `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, and `DATABASE.md` as the current source of truth
- React Hook Form and TanStack Query are still planned additions, not installed dependencies yet
- Some flows are still starter-level implementations and include explicit TODO markers for future completion

## Setup

### Prerequisites

- Node.js 18+
- npm
- A Supabase project for later database wiring

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Fill in local values in `.env.local`:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `APP_PIN_HASH`
   - `APP_PIN_SALT`
   - `SESSION_SECRET`

4. Start the app:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

### Database Note

The repository includes starter Supabase SQL under `supabase/migrations/` and starter seed data in `supabase/seed.sql`.

### Supabase Setup

1. Create a new Supabase project
2. Copy `.env.example` to `.env.local`
3. Add your project URL and anon key:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Apply migrations in order from `supabase/migrations/`
5. Load `supabase/seed.sql` if you want starter workspace/account/entry data

### Auth Setup

Shared PIN access expects three server-side values:

- `APP_PIN_HASH`: SHA-256 hash of `APP_PIN_SALT:your-pin`
- `APP_PIN_SALT`: secret salt used when hashing the PIN
- `SESSION_SECRET`: secret used to sign the cookie session

Until those values are set, PIN login and protected routes will not work correctly.

Current schema direction:

- `workspaces`
- `accounts`
- `entries`
- `exchange_rate_cache`

## Reference Docs

- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `COPILOT_NOTES.md`
- `TODO.md`

## Status

Starter repository scaffold in progress.
