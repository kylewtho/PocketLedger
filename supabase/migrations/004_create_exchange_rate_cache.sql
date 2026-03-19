-- Migration: Create exchange_rate_cache table
-- Provider integration is intentionally deferred; this table supports
-- cached conversion lookups and a visible "last updated" timestamp.

create table if not exists exchange_rate_cache (
  id              uuid primary key default gen_random_uuid(),
  base_currency   text not null,
  target_currency text not null,
  rate            numeric(18,8) not null check (rate > 0),
  fetched_at      timestamptz not null default now(),
  source          text,

  unique (base_currency, target_currency),
  constraint exchange_rate_cache_base_currency_upper check (base_currency = upper(base_currency)),
  constraint exchange_rate_cache_target_currency_upper check (target_currency = upper(target_currency))
);

create index if not exists exchange_rate_cache_lookup_idx
  on exchange_rate_cache(base_currency, target_currency);
