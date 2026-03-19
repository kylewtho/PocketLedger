// TypeScript types derived from the documented PocketLedger schema.

export type Workspace = {
  id: string;
  name: string;
  base_currency: string;
  created_at: string;
  updated_at: string;
};

export type NewWorkspace = Omit<Workspace, "id" | "created_at" | "updated_at">;

export type Account = {
  id: string;
  workspace_id: string;
  name: string;
  currency_code: string;
  initial_balance: number;
  allow_negative: boolean;
  note: string | null;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export type NewAccount = Omit<Account, "id" | "created_at" | "updated_at">;

export type EntryType = "income" | "expense" | "adjustment";

export type Entry = {
  id: string;
  workspace_id: string;
  account_id: string;
  entry_type: EntryType;
  amount: number;
  comment: string | null;
  entry_at: string;
  created_at: string;
  updated_at: string;
};

export type NewEntry = Omit<Entry, "id" | "created_at" | "updated_at">;

export type ExchangeRateCache = {
  id: string;
  base_currency: string;
  target_currency: string;
  rate: number;
  fetched_at: string;
  source: string | null;
};
