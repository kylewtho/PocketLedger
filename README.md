# PocketLedger

A personal finance tracker built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📊 Dashboard with financial overview
- 🏦 Account management
- 📝 Transaction entries
- 🌙 Dark/light mode
- 📱 Responsive layout

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

4. Apply the database migrations in the Supabase SQL editor (or via the Supabase CLI):
   ```bash
   # With the Supabase CLI (recommended)
   supabase db push

   # Or paste each file manually in the SQL editor:
   #   supabase/migrations/001_create_workspaces.sql
   #   supabase/migrations/002_create_accounts.sql
   #   supabase/migrations/003_create_entries.sql
   #   supabase/migrations/004_create_exchange_rate_cache.sql
   ```

5. (Optional) Load sample data:
   ```bash
   # With the Supabase CLI
   supabase db seed

   # Or paste supabase/seed.sql in the SQL editor
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- [Copilot Notes](./COPILOT_NOTES.md)
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