// TypeScript types derived from the intended database schema.

// ─── Workspaces ─────────────────────────────────────────────────────────────

export type Workspace = {
  id: string;
  name: string;
  base_currency: string;
  created_at: string;
  updated_at: string;
};

export type NewWorkspace = Omit<Workspace, "id" | "created_at" | "updated_at">;

// ─── Accounts ────────────────────────────────────────────────────────────────

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

// ─── Entries ─────────────────────────────────────────────────────────────────

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

// ─── Exchange Rate Cache ──────────────────────────────────────────────────────

export type ExchangeRateCache = {
  id: string;
  base_currency: string;
  target_currency: string;
  rate: number;
  fetched_at: string;
  source: string;
};

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: Workspace;
        Insert: Partial<Pick<Workspace, "id" | "created_at" | "updated_at">> & NewWorkspace;
        Update: Partial<NewWorkspace>;
        Relationships: [];
      };
      accounts: {
        Row: Account;
        Insert: Partial<Pick<Account, "id" | "created_at" | "updated_at">> & NewAccount;
        Update: Partial<NewAccount>;
        Relationships: [
          {
            foreignKeyName: "accounts_workspace_id_fkey";
            columns: ["workspace_id"];
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      entries: {
        Row: Entry;
        Insert: Partial<Pick<Entry, "id" | "created_at" | "updated_at">> & NewEntry;
        Update: Partial<NewEntry>;
        Relationships: [
          {
            foreignKeyName: "entries_workspace_id_fkey";
            columns: ["workspace_id"];
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "entries_account_id_fkey";
            columns: ["account_id"];
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      exchange_rate_cache: {
        Row: ExchangeRateCache;
        Insert:
          Partial<Pick<ExchangeRateCache, "id" | "fetched_at">> &
          Omit<ExchangeRateCache, "id" | "fetched_at">;
        Update: Partial<Omit<ExchangeRateCache, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
