-- Migration: Create accounts table

create table if not exists accounts (
  id               uuid primary key default gen_random_uuid(),
  workspace_id     uuid not null references workspaces(id) on delete cascade,
  name             text not null,
  type             text not null check (type in ('checking', 'savings', 'cash', 'credit')),
  starting_balance numeric not null default 0,
  currency         text not null default 'USD',
  is_archived      boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists accounts_workspace_id_idx on accounts(workspace_id);
create index if not exists accounts_is_archived_idx  on accounts(is_archived);

create trigger accounts_set_updated_at
  before update on accounts
  for each row execute procedure set_updated_at();
