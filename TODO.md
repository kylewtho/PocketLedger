# TODO

## Foundation

- [ ] Confirm final package versions
- [ ] Confirm Next.js app boots cleanly
- [x] Confirm Tailwind styles apply correctly
- [x] Confirm dark/light toggle persists
- [x] Confirm responsive layout works on mobile and desktop
- [ ] Confirm database connection works
- [x] Add or confirm `.env.example`
- [x] Document local setup

## Access

- [x] Implement secure PIN verification route
- [x] Implement hashed PIN comparison
- [x] Set secure session cookie
- [x] Protect routes with middleware
- [x] Add logout flow
- [ ] Harden PIN session handling further as needed

## Database

- [ ] Create Supabase project
- [x] Align SQL migrations with `DATABASE.md`
- [x] Update workspace schema to use `base_currency`
- [x] Update accounts schema to use `currency_code`, `initial_balance`, `allow_negative`, `note`, and `archived`
- [x] Remove old account `type` from the MVP schema
- [x] Update entries schema to use `workspace_id`, `entry_type`, `comment`, and `entry_at`
- [x] Add `adjustment` entry support
- [x] Remove old entry `category` from the MVP schema
- [x] Update exchange-rate cache schema to use `target_currency` and `source`
- [ ] Run migrations
- [x] Seed default workspace and sample data
- [ ] Confirm local and deployed environment variables

## Accounts

- [x] Add account create flow
- [x] Add account edit flow
- [x] Add archive flow
- [x] Add account detail page
- [x] Validate note length max 50
- [x] Handle archived accounts cleanly in UI and queries

## Entries

- [x] Add entry create flow
- [x] Add entry edit flow
- [x] Add entry delete flow
- [x] Support `income`, `expense`, and `adjustment`
- [x] Enforce comment requirement when resulting balance goes negative
- [x] Validate comment length max 50
- [x] Ensure balance calculations use entries as source of truth

## Dashboard

- [x] Show total balance prominently
- [x] Show grouped currency totals
- [x] Show unified converted total
- [x] Show exchange-rate last updated timestamp
- [x] Show recent entries
- [x] Add empty states

## Exchange Rates

- [ ] Choose provider
- [x] Implement server-side fetch route
- [ ] Cache rates in database
- [ ] Display fetched timestamp
- [ ] Handle provider errors gracefully

## Export

- [x] Implement accounts CSV export
- [x] Implement entries CSV export

## Deployment

- [ ] Connect GitHub to Vercel
- [ ] Configure Vercel environment variables
- [ ] Deploy first preview build

## Quality

- [ ] Add validation coverage for account and entry payloads
- [ ] Add testing for auth, balances, and negative-balance rules
- [ ] Review docs and implementation for drift before first release
