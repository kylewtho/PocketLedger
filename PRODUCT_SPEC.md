# PocketLedger Product Spec

## Overview

PocketLedger is a minimalist web app for tracking account balances and financial entries across multiple currencies.

The product is designed for personal use first, with a data model and access model that can expand later to multiple users or shared workspaces without a rewrite.

## Product Goals

- Track current balances of multiple accounts
- Record money in, money out, and manual adjustments
- Support negative balances
- Support multiple currencies
- Display balances grouped by original currencies or unified into a selected base currency
- Provide a clean, responsive dashboard with mobile-friendly forms
- Keep access simple with a single shared numeric PIN for the MVP

## MVP Scope

### Included

- PIN-protected access
- Dashboard focused on total balance
- Account management
- Entry management
- Multi-currency display
- Dark mode / light mode toggle
- CSV export stubs
- Supabase database schema
- Exchange-rate fetch route and cache table scaffold

### Not Included Yet

- Transfers between accounts
- Categories
- Tags
- Attachments
- Receipt uploads
- Recurring transactions
- Full user accounts
- Fine-grained permissions
- Audit trails

## Core Concepts

### Workspace

The app currently assumes a single shared workspace.
All accounts and entries belong to that workspace.

This keeps the MVP simple while preserving a clear upgrade path to membership-based access later.

### Accounts

Each account has:

- name
- currency code
- initial balance
- allow negative flag for future account-level restriction support
- short note up to 50 characters
- archived status

Examples:

- HSBC AUD
- HSBC HKD
- Cash
- Credit Card

### Entries

Each entry belongs to one account and has:

- type: income, expense, or adjustment
- amount
- comment up to 50 characters
- datetime

### Balance Calculation

Current account balance is:

`initial_balance + sum(entry effects)`

Where:

- income adds to balance
- expense subtracts from balance
- adjustment may be positive or negative

The app should not rely on a stored running balance as the source of truth.

## Negative Balance Rule

Any account may go negative.

If a new entry causes the resulting balance to become negative, a comment is required.

For the MVP, negative balances are allowed regardless of the account-level flag.
If `allow_negative` remains in the schema, it should be treated as forward-compatible scaffolding rather than active MVP behavior.

## Currency Display Modes

### Mode 1: Grouped by Currency

Balances are displayed in their original currencies, for example:

- AUD total
- HKD total
- USD total

### Mode 2: Unified Base Currency

All balances are converted into one selected base currency using the latest available exchange rate.

The UI should show:

- selected base currency
- converted total
- exchange-rate last updated timestamp

## Access Model

Current access is intentionally simple:

- one shared numeric PIN
- PIN verified server-side
- cookie-based session
- route protection via middleware

The upgrade path should be documented for:

- email login
- magic link
- role-based access
- workspace membership

## UX Priorities

1. Total balance is the most prominent element
2. The dashboard should be clean and fast to understand
3. Forms should be simple and mobile-friendly
4. Theme toggle should be easy to access
5. Empty states should not feel broken or unfinished

## Design Direction

- Minimalist finance dashboard
- Clean typography
- Card-based sections
- Rounded corners
- Good spacing
- Dark mode and light mode
- Low visual noise

## Future Extensions

- Transfers
- Categories
- Tags
- Receipt upload
- Historical FX conversion
- Search and filters
- Better reporting
- Per-user identity
- Workspace members

## Tech Stack

See [ARCHITECTURE.md](./ARCHITECTURE.md)
