# PocketLedger

A minimalist multi-currency finance tracker built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Dashboard centered on total balance
- Multi-currency account tracking
- Entry tracking with `income`, `expense`, and `adjustment`
- Grouped currency totals or unified base-currency conversion
- Shared PIN-protected access for the MVP
- Dark/light mode
- Responsive layout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theming**: next-themes
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- A [Supabase](https://supabase.com) project (free tier is sufficient)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kylewtho/PocketLedger.git
   cd PocketLedger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and set:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```
   Both values are available in your Supabase project under **Settings → API**.

4. Review the current schema docs before applying database SQL:
   ```text
   The product and target schema docs are ahead of the current SQL migrations.
   Read DATABASE.md before using supabase/migrations/* or supabase/seed.sql.
   ```

5. Apply the current database migrations in the Supabase SQL editor (or via the Supabase CLI) only if you want the repository's current scaffolded schema:
   ```bash
   # With the Supabase CLI (recommended)
   supabase db push

   # Or paste each file manually in the SQL editor:
   #   supabase/migrations/001_create_workspaces.sql
   #   supabase/migrations/002_create_accounts.sql
   #   supabase/migrations/003_create_entries.sql
   #   supabase/migrations/004_create_exchange_rate_cache.sql
   ```

6. (Optional) Load sample data from the current scaffold:
   ```bash
   # With the Supabase CLI
   supabase db seed

   # Or paste supabase/seed.sql in the SQL editor
   ```

   Note: the current seed file reflects the older scaffolded schema, not the latest target schema described in `DATABASE.md`.

7. Start the development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
supabase/
├── migrations/             # SQL migration files (run in order)
└── seed.sql                # Sample data for development
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home/landing page
│   ├── dashboard/
│   ├── accounts/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── entries/
│   │   ├── page.tsx
│   │   └── new/page.tsx
│   └── settings/
├── components/
│   ├── navigation/         # Navigation components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utilities and constants
│   ├── constants.ts        # App-wide constants
│   ├── currency.ts         # Currency formatting + balance helpers
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # cn() Tailwind helper
│   └── validations.ts      # Zod schemas for forms
├── types/
│   └── database.ts         # TypeScript types for the database schema
└── styles/                 # Global styles
```

## Documentation

- [Product Spec](./PRODUCT_SPEC.md)
- [Architecture](./ARCHITECTURE.md)
- [Database Schema](./DATABASE.md)
- [Codex Notes](./COPILOT_NOTES.md)
- [TODO](./TODO.md)

## Development

```bash
# Development server
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build
npm run build
```
