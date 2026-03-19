import { calculateBalance } from "@/lib/currency";
import { supabase } from "@/lib/supabase";
import type { Account, Entry, Workspace } from "@/types/database";

export type AccountWithBalance = Account & {
  current_balance: number;
  entry_count: number;
};

export async function getDefaultWorkspace(): Promise<Workspace> {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load workspace: ${error.message}`);
  }

  if (!data) {
    throw new Error("No workspace found. Run the Supabase migrations and seed first.");
  }

  return data as Workspace;
}

export async function getAccountsWithBalances(): Promise<{
  workspace: Workspace;
  accounts: AccountWithBalance[];
}> {
  const workspace = await getDefaultWorkspace();

  const [{ data: accountsData, error: accountsError }, { data: entriesData, error: entriesError }] =
    await Promise.all([
      supabase
        .from("accounts")
        .select("*")
        .eq("workspace_id", workspace.id)
        .order("archived", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("entries")
        .select("*")
        .eq("workspace_id", workspace.id)
        .order("entry_at", { ascending: false }),
    ]);

  if (accountsError) {
    throw new Error(`Failed to load accounts: ${accountsError.message}`);
  }

  if (entriesError) {
    throw new Error(`Failed to load entries: ${entriesError.message}`);
  }

  const accounts = (accountsData ?? []) as Account[];
  const entries = (entriesData ?? []) as Entry[];

  const accountsWithBalances = accounts.map((account) => {
    const accountEntries = entries.filter((entry) => entry.account_id === account.id);

    return {
      ...account,
      current_balance: calculateBalance(account.initial_balance, accountEntries),
      entry_count: accountEntries.length,
    };
  });

  return { workspace, accounts: accountsWithBalances };
}

export async function getAccountDetail(accountId: string): Promise<{
  workspace: Workspace;
  account: AccountWithBalance;
  entries: Entry[];
}> {
  const workspace = await getDefaultWorkspace();

  const { data: accountData, error: accountError } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", accountId)
    .eq("workspace_id", workspace.id)
    .maybeSingle();

  if (accountError) {
    throw new Error(`Failed to load account: ${accountError.message}`);
  }

  if (!accountData) {
    throw new Error("Account not found.");
  }

  const { data: entriesData, error: entriesError } = await supabase
    .from("entries")
    .select("*")
    .eq("workspace_id", workspace.id)
    .eq("account_id", accountId)
    .order("entry_at", { ascending: false });

  if (entriesError) {
    throw new Error(`Failed to load entries: ${entriesError.message}`);
  }

  const entries = (entriesData ?? []) as Entry[];
  const account = accountData as Account;

  return {
    workspace,
    account: {
      ...account,
      current_balance: calculateBalance(account.initial_balance, entries),
      entry_count: entries.length,
    },
    entries,
  };
}
