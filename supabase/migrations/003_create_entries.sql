-- Migration: Create entries table

create table if not exists entries (
  id          uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  account_id  uuid not null references accounts(id) on delete cascade,
  entry_type  text not null check (entry_type in ('income', 'expense', 'adjustment')),
  amount      numeric(18,2) not null,
  comment     varchar(50),
  entry_at    timestamptz not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists entries_workspace_id_idx on entries(workspace_id);
create index if not exists entries_account_id_idx on entries(account_id);
create index if not exists entries_entry_at_idx on entries(entry_at);
create index if not exists entries_entry_type_idx on entries(entry_type);

create trigger entries_set_updated_at
  before update on entries
  for each row execute procedure set_updated_at();
