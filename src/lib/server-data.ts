import { DEFAULT_BASE_CURRENCY, DEFAULT_WORKSPACE_ID } from "@/lib/constants";
import { calculateBalance } from "@/lib/currency";
import { supabase } from "@/lib/supabase";
import type { Account, Entry } from "@/types/database";

export async function getWorkspaceBaseCurrency(): Promise<string> {
  const { data } = await supabase
    .from("workspaces")
    .select("base_currency")
    .eq("id", DEFAULT_WORKSPACE_ID)
    .maybeSingle();

  return (data as Pick<Account, never> & { base_currency?: string } | null)?.base_currency ?? DEFAULT_BASE_CURRENCY;
}

export async function getAccounts(options?: { includeArchived?: boolean }): Promise<Account[]> {
  let query = supabase
    .from("accounts")
    .select("*")
    .eq("workspace_id", DEFAULT_WORKSPACE_ID)
    .order("name");

  if (!options?.includeArchived) {
    query = query.eq("archived", false);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load accounts: ${error.message}`);
  }

  return (data as Account[] | null) ?? [];
}

export async function getEntries(options?: { accountId?: string; limit?: number }): Promise<Entry[]> {
  let query = supabase
    .from("entries")
    .select("*")
    .eq("workspace_id", DEFAULT_WORKSPACE_ID)
    .order("entry_at", { ascending: false });

  if (options?.accountId) {
    query = query.eq("account_id", options.accountId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load entries: ${error.message}`);
  }

  return (data as Entry[] | null) ?? [];
}

export async function getAccountById(id: string): Promise<Account | null> {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", id)
    .eq("workspace_id", DEFAULT_WORKSPACE_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load account: ${error.message}`);
  }

  return (data as Account | null) ?? null;
}

export async function getEntryById(id: string): Promise<Entry | null> {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .eq("workspace_id", DEFAULT_WORKSPACE_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load entry: ${error.message}`);
  }

  return (data as Entry | null) ?? null;
}

export async function getAccountBalance(accountId: string): Promise<number> {
  const account = await getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  const entries = await getEntries({ accountId });
  return calculateBalance(account.initial_balance, entries);
}

export async function getAccountSummaries(options?: { includeArchived?: boolean }) {
  const accounts = await getAccounts(options);
  const allEntries = await getEntries();

  return accounts.map((account) => {
    const accountEntries = allEntries.filter((entry) => entry.account_id === account.id);
    return {
      ...account,
      current_balance: calculateBalance(account.initial_balance, accountEntries),
      entries_count: accountEntries.length,
    };
  });
}

export function calculateProjectedBalance(
  account: Account,
  existingEntries: Entry[],
  nextEntry: Pick<Entry, "entry_type" | "amount" | "comment" | "entry_at" | "account_id" | "workspace_id">,
  entryIdToReplace?: string
): number {
  const filteredEntries = entryIdToReplace
    ? existingEntries.filter((entry) => entry.id !== entryIdToReplace)
    : existingEntries;

  return calculateBalance(account.initial_balance, [
    ...filteredEntries,
    {
      id: entryIdToReplace ?? "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...nextEntry,
    },
  ]);
}
