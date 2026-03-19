# PocketLedger Database

## Principles

- Keep the schema simple
- Use a single shared workspace for now
- Leave room for future workspace membership
- Use entries, not stored running balances, as the primary source of truth
- Cache exchange rates for conversion display

## Status

This document describes the intended schema direction based on the current product spec.
The SQL migrations in `supabase/migrations/` and the starter seed in `supabase/seed.sql` are intended to follow this schema direction.

## Tables

### workspaces

Represents a shared ledger space.

Fields:

- `id`
- `name`
- `base_currency`
- `created_at`
- `updated_at`

Notes:

- The MVP assumes one shared workspace.
- Keeping a dedicated `workspaces` table avoids a later rewrite when membership is introduced.

### accounts

Represents individual tracked balances.

Fields:

- `id`
- `workspace_id`
- `name`
- `currency_code`
- `initial_balance`
- `allow_negative`
- `note`
- `archived`
- `created_at`
- `updated_at`

Notes:

- `note` is optional and capped at 50 characters.
- For the current MVP, negative balances are allowed broadly.
- `allow_negative` exists only to preserve flexibility for future account-level restrictions and should not block negative balances in the MVP.

### entries

Represents financial records linked to one account.

Fields:

- `id`
- `workspace_id`
- `account_id`
- `entry_type`
- `amount`
- `comment`
- `entry_at`
- `created_at`
- `updated_at`

Notes:

- `comment` is optional in general, but required when an entry causes the resulting balance to go negative.
- `workspace_id` is somewhat redundant if `account_id` is always present, but can simplify workspace-scoped querying and future policies.

### exchange_rate_cache

Stores fetched rates for reuse and timestamp display.

Fields:

- `id`
- `base_currency`
- `target_currency`
- `rate`
- `fetched_at`
- `source`

Notes:

- Cache records should support displaying the `last updated` timestamp in the UI.
- `source` helps track provider provenance and simplify future provider switching.

## Entry Effect Rules

- `income` => positive effect
- `expense` => negative effect
- `adjustment` => positive or negative, depending on the stored amount

Recommended handling:

- store `income` and `expense` as positive amounts and apply the sign in business logic
- allow `adjustment` to be stored as either positive or negative

## Balance Calculation

Account balance should be derived, not stored:

```text
initial_balance + sum(entry effects)
```

Where:

- `income` adds to balance
- `expense` subtracts from balance
- `adjustment` may add or subtract

This should remain the canonical source of truth even if cached aggregates are added later.

## Recommended SQL Data Types

- `uuid` for primary keys
- `numeric(18,2)` for money amounts
- `timestamptz` for timestamps
- `varchar(3)` for currency codes
- `varchar(50)` for short notes and comments

## Constraints

- `entry_type` should be constrained to `income`, `expense`, or `adjustment`
- `currency_code`, `base_currency`, and `target_currency` should be uppercase ISO-style codes at the application layer
- `note` max length: 50
- `comment` max length: 50
- `rate` must be greater than 0
- `initial_balance` can be positive, zero, or negative
- `amount` validation should follow entry semantics rather than one global positive-only rule

## Indexes

Recommended indexes:

- `accounts.workspace_id`
- `accounts.archived`
- `entries.workspace_id`
- `entries.account_id`
- `entries.entry_at`
- `entries.entry_type`
- unique index on exchange rate pair, for example `exchange_rate_cache(base_currency, target_currency)`

## Seed Data

The starter seed should include:

- one default workspace
- at least two accounts in different currencies
- a few sample entries
- at least one cached exchange-rate record if conversion UI is demonstrated locally

## Future Tables

Potential future additions:

- `workspace_members`
- `categories`
- `tags`
- `recurring_entries`
- `attachments`
- `audit_log`

## Implementation Notes

- `allow_negative` exists in the schema for future account-level control, but the current MVP still allows negative balances broadly.
- `entries.workspace_id` is included even though it can be derived from `account_id`, because it preserves simpler workspace-scoped querying and future policy support.
- `exchange_rate_cache.source` is included so provider provenance can be tracked as the FX integration evolves.
