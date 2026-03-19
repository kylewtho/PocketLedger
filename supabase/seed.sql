-- Seed: default workspace and sample data
-- Run this after all migrations to populate the database with a starter
-- workspace, two accounts, and a handful of sample entries.

-- Default workspace
insert into workspaces (id, name, description, currency)
values (
  '00000000-0000-0000-0000-000000000001',
  'Personal',
  'Default personal finance workspace',
  'USD'
)
on conflict (id) do nothing;

-- Sample accounts
insert into accounts (id, workspace_id, name, type, starting_balance, currency)
values
  (
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000001',
    'Checking',
    'checking',
    1000.00,
    'USD'
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000001',
    'Savings',
    'savings',
    5000.00,
    'USD'
  )
on conflict (id) do nothing;

-- Sample entries for the Checking account
insert into entries (account_id, type, amount, category, description, date)
values
  (
    '00000000-0000-0000-0000-000000000010',
    'income',
    3000.00,
    'Salary',
    'Monthly salary',
    current_date - interval '15 days'
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'expense',
    120.00,
    'Food',
    'Groceries',
    current_date - interval '10 days'
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'expense',
    45.00,
    'Transport',
    'Monthly transit pass',
    current_date - interval '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'expense',
    800.00,
    'Housing',
    'Rent payment',
    current_date - interval '1 day'
  );
