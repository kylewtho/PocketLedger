import type { Entry } from "@/types/database";

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

function entryEffect(entry: Entry): number {
  if (entry.entry_type === "income") {
    return entry.amount;
  }

  if (entry.entry_type === "expense") {
    return -Math.abs(entry.amount);
  }

  return entry.amount;
}

export function calculateBalance(initialBalance: number, entries: Entry[]): number {
  return entries.reduce((balance, entry) => balance + entryEffect(entry), initialBalance);
}

export function totalIncome(entries: Entry[]): number {
  return entries
    .filter((entry) => entry.entry_type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);
}

export function totalExpenses(entries: Entry[]): number {
  return entries
    .filter((entry) => entry.entry_type === "expense")
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
}

export function totalAdjustments(entries: Entry[]): number {
  return entries
    .filter((entry) => entry.entry_type === "adjustment")
    .reduce((sum, entry) => sum + entry.amount, 0);
}
