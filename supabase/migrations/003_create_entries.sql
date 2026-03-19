-- Migration: Create entries table

create table if not exists entries (
  id          uuid primary key default gen_random_uuid(),
  account_id  uuid not null references accounts(id) on delete cascade,
  type        text not null check (type in ('income', 'expense')),
  amount      numeric not null check (amount > 0),
  category    text not null,
  description text,
  date        date not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists entries_account_id_idx on entries(account_id);
create index if not exists entries_date_idx       on entries(date);
create index if not exists entries_type_idx       on entries(type);

create trigger entries_set_updated_at
  before update on entries
  for each row execute procedure set_updated_at();
