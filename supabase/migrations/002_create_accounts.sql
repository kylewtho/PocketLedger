-- Migration: Create accounts table

create table if not exists accounts (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  name            text not null,
  currency_code   text not null,
  initial_balance numeric(18,2) not null default 0,
  allow_negative  boolean not null default true,
  note            varchar(50),
  archived        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint accounts_currency_code_upper check (currency_code = upper(currency_code))
);

create index if not exists accounts_workspace_id_idx on accounts(workspace_id);
create index if not exists accounts_archived_idx on accounts(archived);
create index if not exists accounts_currency_code_idx on accounts(currency_code);

create trigger accounts_set_updated_at
  before update on accounts
  for each row execute procedure set_updated_at();
