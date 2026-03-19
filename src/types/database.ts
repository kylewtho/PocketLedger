// TypeScript types derived from the database schema.
// These are plain types — no Supabase-generated code required.

// ─── Workspaces ─────────────────────────────────────────────────────────────

export type Workspace = {
  id: string;
  name: string;
  description: string | null;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type NewWorkspace = Omit<Workspace, "id" | "created_at" | "updated_at">;

// ─── Accounts ────────────────────────────────────────────────────────────────

export type AccountType = "checking" | "savings" | "cash" | "credit";

export type Account = {
  id: string;
  workspace_id: string;
  name: string;
  type: AccountType;
  starting_balance: number;
  currency: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type NewAccount = Omit<Account, "id" | "created_at" | "updated_at">;

// ─── Entries ─────────────────────────────────────────────────────────────────

export type EntryType = "income" | "expense";

export type EntryCategory =
  // Income
  | "Salary"
  | "Freelance"
  | "Other Income"
  // Expense
  | "Food"
  | "Transport"
  | "Housing"
  | "Healthcare"
  | "Entertainment"
  | "Shopping"
  | "Other";

export type Entry = {
  id: string;
  account_id: string;
  type: EntryType;
  amount: number;
  category: EntryCategory;
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
};

export type NewEntry = Omit<Entry, "id" | "created_at" | "updated_at">;

// ─── Exchange Rate Cache ──────────────────────────────────────────────────────

export type ExchangeRateCache = {
  id: string;
  base_currency: string;
  quote_currency: string;
  rate: number;
  fetched_at: string;
};
