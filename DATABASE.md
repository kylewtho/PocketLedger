# PocketLedger — Database Schema

> **Status**: Migrations implemented in `supabase/migrations/`. Apply them in order before running the app.

## Tables

### workspaces

| Column      | Type        | Notes                              |
|-------------|-------------|------------------------------------|
| id          | uuid (PK)   | Default: gen_random_uuid()         |
| name        | text        | Required                           |
| description | text        | Optional                           |
| currency    | text        | Default: 'USD'                     |
| created_at  | timestamptz | Default: now()                     |
| updated_at  | timestamptz | Default: now()                     |

### accounts

| Column           | Type        | Notes                              |
|------------------|-------------|------------------------------------|
| id               | uuid (PK)   | Default: gen_random_uuid()         |
| workspace_id     | uuid (FK)   | References workspaces.id           |
| name             | text        | Required                           |
| type             | text        | checking, savings, cash, credit    |
| starting_balance | numeric     | Default: 0                         |
| currency         | text        | Default: 'USD'                     |
| is_archived      | boolean     | Default: false                     |
| created_at       | timestamptz | Default: now()                     |
| updated_at       | timestamptz | Default: now()                     |

### entries

| Column      | Type        | Notes                              |
|-------------|-------------|------------------------------------|
| id          | uuid (PK)   | Default: gen_random_uuid()         |
| account_id  | uuid (FK)   | References accounts.id             |
| type        | text        | income or expense                  |
| amount      | numeric     | Required, positive                 |
| category    | text        | See category list                  |
| description | text        | Optional                           |
| date        | date        | Required                           |
| created_at  | timestamptz | Default: now()                     |
| updated_at  | timestamptz | Default: now()                     |

### exchange_rate_cache

| Column         | Type        | Notes                              |
|----------------|-------------|------------------------------------|
| id             | uuid (PK)   | Default: gen_random_uuid()         |
| base_currency  | text        | 3-letter ISO code                  |
| quote_currency | text        | 3-letter ISO code                  |
| rate           | numeric     | Exchange rate, must be > 0         |
| fetched_at     | timestamptz | Default: now()                     |

Unique constraint on `(base_currency, quote_currency)`.

## Computed Values

Account balance is computed as:
```
balance = starting_balance
        + SUM(entries WHERE type='income' AND account_id=account.id)
        - SUM(entries WHERE type='expense' AND account_id=account.id)
```

See `src/lib/currency.ts` for the `calculateBalance()` helper.

## Indexes

- `accounts.workspace_id` — for filtering accounts by workspace
- `accounts.is_archived` — for filtering archived accounts
- `entries.account_id` — for filtering entries by account
- `entries.date` — for sorting entries by date
- `entries.type` — for filtering by income/expense
- `exchange_rate_cache.(base_currency, quote_currency)` — for fast lookups

## Row Level Security (TODO)

When multi-user support is added, RLS policies will restrict data access per user.
