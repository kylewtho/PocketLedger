-- Migration: Create exchange_rate_cache table
-- Caches fetched exchange rates to avoid redundant API calls.
-- Provider logic will be implemented in a future PR.

create table if not exists exchange_rate_cache (
  id              uuid primary key default gen_random_uuid(),
  base_currency   varchar(3) not null,
  target_currency varchar(3) not null,
  rate            numeric(18,6) not null check (rate > 0),
  fetched_at      timestamptz not null default now(),
  source          text not null default 'manual',

  constraint exchange_rate_cache_base_currency_uppercase_chk
    check (base_currency = upper(base_currency)),
  constraint exchange_rate_cache_target_currency_uppercase_chk
    check (target_currency = upper(target_currency)),
  unique (base_currency, target_currency)
);

create index if not exists exchange_rate_cache_currencies_idx
  on exchange_rate_cache(base_currency, target_currency);
