-- Migration: Create workspaces table
-- MVP assumes a single shared workspace, but the table leaves room
-- for future workspace membership and stronger auth models.

create table if not exists workspaces (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  base_currency text not null default 'USD',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

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
