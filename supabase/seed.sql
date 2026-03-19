-- Seed: default workspace and sample data
-- Run this after all migrations to populate the database with a starter
-- workspace, two accounts, and a handful of sample entries.

-- Default workspace
insert into workspaces (id, name, base_currency)
values (
  '00000000-0000-0000-0000-000000000001',
  'Personal',
  'USD'
)
on conflict (id) do nothing;

-- Sample accounts
insert into accounts (
  id,
  workspace_id,
  name,
  currency_code,
  initial_balance,
  allow_negative,
  note,
  archived
)
values
  (
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000001',
    'HSBC AUD',
    'AUD',
    1000.00,
    true,
    'Daily spending',
    false
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000001',
    'HSBC HKD',
    'HKD',
    5000.00,
    true,
    'Travel funds',
    false
  )
on conflict (id) do nothing;

-- Sample entries for the AUD account
insert into entries (workspace_id, account_id, entry_type, amount, comment, entry_at)
values
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'income',
    3000.00,
    'Monthly salary',
    now() - interval '15 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'expense',
    120.00,
    'Groceries',
    now() - interval '10 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'adjustment',
    -45.00,
    'Cash correction',
    now() - interval '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'expense',
    800.00,
    'Rent payment',
    now() - interval '1 day'
  );

insert into exchange_rate_cache (
  id,
  base_currency,
  target_currency,
  rate,
  fetched_at,
  source
)
values (
  '00000000-0000-0000-0000-000000000020',
  'AUD',
  'USD',
  0.66,
  now(),
  'seed'
)
on conflict (base_currency, target_currency) do update
set rate = excluded.rate,
    fetched_at = excluded.fetched_at,
    source = excluded.source;
