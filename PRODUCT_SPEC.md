# PocketLedger — Product Specification

## Overview

PocketLedger is a personal finance tracker designed for individuals who want a simple, private way to track their accounts and financial entries without complex cloud sync.

## Goals

- Simple, fast UI for daily finance tracking
- Support multiple accounts (checking, savings, cash, credit)
- Record income and expense entries with categories
- Dashboard with balance summaries
- Offline-first capability (future)
- PIN-based auth for privacy on shared devices

## Non-Goals (v1)

- Multi-user / team features
- Complex budgeting tools
- Bank sync / Open Banking
- Investment tracking

## User Stories

### Accounts
- As a user, I can create an account with a name, type, and starting balance
- As a user, I can view all my accounts and their current balances
- As a user, I can edit or archive an account
- As a user, I can view all entries for a specific account

### Entries
- As a user, I can record an income or expense entry
- As a user, I can assign an entry to an account
- As a user, I can categorize an entry (food, transport, salary, etc.)
- As a user, I can view all entries, sorted by date

### Dashboard
- As a user, I can see my total balance across all accounts
- As a user, I can see my net income/expense for the current month

### Settings
- As a user, I can toggle between dark and light mode
- As a user, I can set a PIN to protect access (future)
- As a user, I can export my data as CSV (future)

## Account Types

- Checking
- Savings
- Cash
- Credit Card
- Investment (future)

## Entry Categories

- Income: Salary, Freelance, Other Income
- Expense: Food, Transport, Housing, Healthcare, Entertainment, Shopping, Other

## Tech Stack

See [ARCHITECTURE.md](./ARCHITECTURE.md)
