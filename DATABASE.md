# PocketLedger — Database Schema

> **Status**: The target schema below now matches the checked-in migrations in `supabase/migrations/`.

## Principles

- Keep the schema simple for a single shared workspace MVP
- Use entries, not stored running balances, as the source of truth
- Allow future expansion to workspace membership and stronger auth
- Keep exchange-rate caching server-side and database-backed

## Tables

### workspaces

| Column        | Type        | Notes                      |
|---------------|-------------|----------------------------|
| id            | uuid (PK)   | Default: `gen_random_uuid()` |
| name          | text        | Required                   |
| base_currency | text        | 3-letter ISO code          |
| created_at    | timestamptz | Default: `now()`           |
| updated_at    | timestamptz | Default: `now()`           |

### accounts

| Column          | Type          | Notes                               |
|-----------------|---------------|-------------------------------------|
| id              | uuid (PK)     | Default: `gen_random_uuid()`        |
| workspace_id    | uuid (FK)     | References `workspaces.id`          |
| name            | text          | Required                            |
| currency_code   | text          | 3-letter ISO code, uppercase        |
| initial_balance | numeric(18,2) | Starting value before entries       |
| allow_negative  | boolean       | Default: `true`                     |
| note            | varchar(50)   | Optional short note                 |
| archived        | boolean       | Default: `false`                    |
| created_at      | timestamptz   | Default: `now()`                    |
| updated_at      | timestamptz   | Default: `now()`                    |

### entries

| Column       | Type          | Notes                                            |
|--------------|---------------|--------------------------------------------------|
| id           | uuid (PK)     | Default: `gen_random_uuid()`                     |
| workspace_id | uuid (FK)     | References `workspaces.id`                       |
| account_id   | uuid (FK)     | References `accounts.id`                         |
| entry_type   | text          | `income`, `expense`, or `adjustment`             |
| amount       | numeric(18,2) | Positive for income, negative or positive adjustment |
| comment      | varchar(50)   | Optional, but required by app logic in some cases |
| entry_at     | timestamptz   | Entry timestamp                                  |
| created_at   | timestamptz   | Default: `now()`                                 |
| updated_at   | timestamptz   | Default: `now()`                                 |

### exchange_rate_cache

| Column          | Type          | Notes                               |
|-----------------|---------------|-------------------------------------|
| id              | uuid (PK)     | Default: `gen_random_uuid()`        |
| base_currency   | text          | 3-letter ISO code                   |
| target_currency | text          | 3-letter ISO code                   |
| rate            | numeric(18,8) | Must be greater than 0              |
| fetched_at      | timestamptz   | Default: `now()`                    |
| source          | text          | Optional provider/source label      |

Unique constraint on `(base_currency, target_currency)`.

## Balance Calculation

Account balance is derived as:

```text
balance = initial_balance + sum(entry effects)
```

Where:
- `income` adds `amount`
- `expense` subtracts `amount`
- `adjustment` applies `amount` as-is

See [src/lib/currency.ts](/Users/kyle/Documents/GitHub/PocketLedger/src/lib/currency.ts) for the current helper implementation.

## Recommended Indexes

- `accounts.workspace_id`
- `accounts.archived`
- `accounts.currency_code`
- `entries.workspace_id`
- `entries.account_id`
- `entries.entry_type`
- `entries.entry_at`
- `exchange_rate_cache.(base_currency, target_currency)`

## Seed Data

The starter seed currently includes:
- one default workspace
- two sample accounts in different currencies
- sample entries covering `income`, `expense`, and `adjustment`
- one cached exchange-rate record

## Notes

- `allow_negative` is retained in the schema for forward compatibility, even though the current product rules broadly allow negative balances.
- The negative-balance comment requirement is enforced in application logic, not by a database constraint.
- Row-level security is intentionally deferred until the app moves beyond the shared-workspace MVP.
