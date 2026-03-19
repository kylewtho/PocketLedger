-- Seed: default workspace and sample multi-currency data

insert into workspaces (id, name, base_currency)
values (
  '00000000-0000-0000-0000-000000000001',
  'Shared Workspace',
  'USD'
)
on conflict (id) do nothing;

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
    'Cash Wallet',
    'USD',
    120.00,
    true,
    'Daily cash',
    false
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000001',
    'HSBC AUD',
    'AUD',
    850.00,
    true,
    'Travel funds',
    false
  )
on conflict (id) do nothing;

insert into entries (
  id,
  workspace_id,
  account_id,
  entry_type,
  amount,
  comment,
  entry_at
)
values
  (
    '00000000-0000-0000-0000-000000000100',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'expense',
    24.50,
    'Groceries',
    now() - interval '4 days'
  ),
  (
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010',
    'income',
    100.00,
    'Cash top-up',
    now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000011',
    'adjustment',
    -15.00,
    'Bank fee correction',
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
values
  (
    '00000000-0000-0000-0000-000000000200',
    'USD',
    'AUD',
    1.52000000,
    now() - interval '6 hours',
    'seed'
  )
on conflict (base_currency, target_currency) do update
set
  rate = excluded.rate,
  fetched_at = excluded.fetched_at,
  source = excluded.source;
