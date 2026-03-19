-- Migration: Create exchange_rate_cache table
-- Caches fetched exchange rates to avoid redundant API calls.
-- Provider logic will be implemented in a future PR.

create table if not exists exchange_rate_cache (
  id            uuid primary key default gen_random_uuid(),
  base_currency text not null,
  quote_currency text not null,
  rate          numeric not null check (rate > 0),
  fetched_at    timestamptz not null default now(),

  unique (base_currency, quote_currency)
);

create index if not exists exchange_rate_cache_currencies_idx
  on exchange_rate_cache(base_currency, quote_currency);
