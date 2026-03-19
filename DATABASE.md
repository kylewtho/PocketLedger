# PocketLedger — Database Schema

> **Note**: Supabase integration is not yet implemented. This document describes the planned schema.

## Tables

### accounts

| Column          | Type        | Notes                              |
|-----------------|-------------|------------------------------------|
| id              | uuid (PK)   | Default: gen_random_uuid()         |
| name            | text        | Required                           |
| type            | text        | checking, savings, cash, credit    |
| starting_balance| numeric     | Default: 0                         |
| currency        | text        | Default: 'USD'                     |
| is_archived     | boolean     | Default: false                     |
| created_at      | timestamptz | Default: now()                     |
| updated_at      | timestamptz | Default: now()                     |

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

## Computed Values

Account balance is computed as:
```
balance = starting_balance
        + SUM(entries WHERE type='income' AND account_id=account.id)
        - SUM(entries WHERE type='expense' AND account_id=account.id)
```

## Indexes

- `entries.account_id` — for filtering entries by account
- `entries.date` — for sorting entries by date
- `entries.type` — for filtering by income/expense

## Row Level Security (TODO)

When multi-user support is added, RLS policies will restrict data access per user.
