# PocketLedger — Architecture

## Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Framework    | Next.js 14 (App Router) |
| Language     | TypeScript              |
| Styling      | Tailwind CSS            |
| Theming      | next-themes             |
| Icons        | lucide-react            |
| Database     | Supabase (PostgreSQL)   |
| Auth         | PIN-based (custom)      |
| Hosting      | Vercel (planned)        |

## Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (nav, theme)
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Dashboard
│   ├── accounts/           # Account CRUD
│   ├── entries/            # Entry CRUD
│   └── settings/           # App settings
├── components/
│   ├── navigation/         # SideNav, TopBar
│   └── ui/                 # Shared UI: Button, Card, EmptyState, PageHeader
├── lib/
│   ├── utils.ts            # cn() helper
│   ├── constants.ts        # App-wide constants
│   └── supabase.ts         # Supabase client (TODO)
├── hooks/                  # Custom React hooks (TODO)
├── types/                  # TypeScript types (TODO)
└── styles/
    └── globals.css         # Global Tailwind styles
```

## Data Flow

```
Page Component
  └─> Server Action / API Route (TODO)
        └─> Supabase Client
              └─> PostgreSQL (Supabase)
```

## Key Decisions

### App Router (Next.js 14)
Using the App Router for better layouts, server components, and future streaming support.

### Supabase
Chosen for its simple setup, built-in auth, and real-time capabilities. Integration is deferred to a future PR.

### PIN Auth
Simple PIN-based auth stored as a hashed value for privacy on shared devices. No email/password required. Implementation deferred.

### Tailwind CSS
Utility-first CSS for fast, consistent styling with minimal custom CSS.

## Future Considerations

- Add React Query or SWR for data fetching
- Add Zod for form validation
- Add react-hook-form for form management
- Consider PWA for offline support
