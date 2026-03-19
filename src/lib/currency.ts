import type { Entry } from "@/types/database";

// ─── Currency formatting ──────────────────────────────────────────────────────

/**
 * Format a numeric amount as a currency string.
 *
 * @example
 * formatCurrency(1234.5)           // "$1,234.50"
 * formatCurrency(1234.5, "EUR")    // "€1,234.50"
 * formatCurrency(1234.5, "GBP", "de-DE") // "1.234,50 £"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ─── Balance calculation ──────────────────────────────────────────────────────

/**
 * Compute the current balance for an account.
 *
 * balance = startingBalance
 *         + SUM(income entries)
 *         - SUM(expense entries)
 */
export function calculateBalance(startingBalance: number, entries: Entry[]): number {
  return entries.reduce((balance, entry) => {
    return entry.type === "income"
      ? balance + entry.amount
      : balance - entry.amount;
  }, startingBalance);
}

/**
 * Sum all income entries in a list.
 */
export function totalIncome(entries: Entry[]): number {
  return entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
}

/**
 * Sum all expense entries in a list.
 */
export function totalExpenses(entries: Entry[]): number {
  return entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
}
