-- Migration: Create workspaces table
-- PocketLedger currently uses a single shared workspace, but this table
-- preserves a clean upgrade path for membership-based access later.

create table if not exists workspaces (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  base_currency varchar(3) not null default 'USD',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint workspaces_base_currency_uppercase_chk
    check (base_currency = upper(base_currency))
);

-- Keep updated_at current automatically
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger workspaces_set_updated_at
  before update on workspaces
  for each row execute procedure set_updated_at();
