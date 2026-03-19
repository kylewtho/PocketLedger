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
 * Compute the current balance for an account from initial balance and entry history.
 *
 * balance = initialBalance
 *         + SUM(income entries)
 *         - SUM(expense entries)
 *         + SUM(adjustment entries)
 */
export function calculateBalance(initialBalance: number, entries: Entry[]): number {
  return entries.reduce((balance, entry) => {
    if (entry.entry_type === "income") {
      return balance + entry.amount;
    }

    if (entry.entry_type === "expense") {
      return balance - Math.abs(entry.amount);
    }

    return balance + entry.amount;
  }, initialBalance);
}

/**
 * Sum all income entries in a list.
 */
export function totalIncome(entries: Entry[]): number {
  return entries
    .filter((e) => e.entry_type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
}

/**
 * Sum all expense entries in a list.
 */
export function totalExpenses(entries: Entry[]): number {
  return entries
    .filter((e) => e.entry_type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
}

export function totalAdjustments(entries: Entry[]): number {
  return entries
    .filter((e) => e.entry_type === "adjustment")
    .reduce((sum, e) => sum + e.amount, 0);
}
