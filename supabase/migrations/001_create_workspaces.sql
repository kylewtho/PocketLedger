-- Migration: Create workspaces table
-- Workspaces represent a named set of accounts and entries, supporting
-- future multi-workspace (e.g. personal vs. business) use cases.

create table if not exists workspaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  currency    text not null default 'USD',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
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
