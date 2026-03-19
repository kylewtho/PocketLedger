# Codex Notes

## Purpose

This file exists to guide coding agents working in this repository.

Codex should be treated as the default development agent going forward, but the guidance here is written to remain useful for any future coding assistant.

## Current Goal

Build a strong starter codebase for PocketLedger, not a fully completed product.

## Priorities

1. Clean architecture
2. Good starter UX
3. Safe server-side PIN handling
4. Strong validation foundations
5. Good documentation
6. Easy future extension

## Rules for Agents

- Do not hardcode the numeric PIN in client code.
- Do not expose the real PIN to the browser.
- Do not add unnecessary dependencies.
- Keep comments practical, not excessive.
- Prefer simple and maintainable solutions.
- Use `TODO` markers where implementation is intentionally incomplete.
- Match the documented product behavior in `PRODUCT_SPEC.md`.
- Match the documented data model direction in `DATABASE.md`.
- Match the architectural direction in `ARCHITECTURE.md`.
- Prefer updating docs when implementation and documentation diverge.

## Access Model

For now, treat the app as:

- one shared workspace
- one shared numeric PIN
- cookie-based route protection

Do not implement full multi-user auth yet.

## Product Assumptions

The current MVP assumes:

- account balances are derived from `initial_balance` plus entry effects
- entries use `income`, `expense`, and `adjustment`
- categories and tags are out of scope
- multi-currency support is a core requirement
- grouped and base-currency display modes both matter

## UI Direction

- Minimalist
- Finance dashboard feel
- Clear total balance emphasis
- Responsive
- Dark/light theme
- Calm and readable

## Forms

Forms should use:

- Zod validation
- accessible labels
- sensible default values
- simple error states

Use React Hook Form when form complexity justifies it or once it is added to the project.

## Current Repository Reality

At the time of writing:

- the product, architecture, and database docs have been updated to the latest MVP direction
- starter SQL migrations and seed data are in place for the current schema direction
- React Hook Form and TanStack Query are architectural recommendations, not confirmed installed dependencies
- app routes, auth scaffolding, and shared UI components exist under `src/`

## Known Future Work

- complete PIN session hardening
- exchange rate provider integration
- CSV export implementation
- negative-balance enforcement logic refinement
- Supabase CRUD completion if partially stubbed
- testing

## Working Style

- Prefer changes that preserve a clean upgrade path to real auth and workspace membership.
- Avoid implementing speculative features that the MVP explicitly excludes.
- If implementation and docs disagree, either align the code or leave a clear note explaining the gap.
