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

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

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

3. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
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