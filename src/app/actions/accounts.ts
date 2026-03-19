"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAccountDetail, getDefaultWorkspace } from "@/lib/accounts";
import { supabase } from "@/lib/supabase";
import { accountSchema } from "@/lib/validations";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function parseAccountFormData(formData: FormData, workspaceId: string, archived = false) {
  const note = getString(formData, "note").trim();
  const initialBalanceRaw = getString(formData, "initial_balance").trim();
  const parsedInitialBalance = initialBalanceRaw === "" ? 0 : Number(initialBalanceRaw);

  return accountSchema.safeParse({
    workspace_id: workspaceId,
    name: getString(formData, "name"),
    currency_code: getString(formData, "currency_code"),
    initial_balance: parsedInitialBalance,
    allow_negative: formData.get("allow_negative") === "on",
    note: note === "" ? null : note,
    archived,
  });
}

export async function createAccount(formData: FormData) {
  try {
    const workspace = await getDefaultWorkspace();
    const parsed = parseAccountFormData(formData, workspace.id);

    if (!parsed.success) {
      redirect(`/accounts/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid account data.")}`);
    }

    const { data, error } = await supabase
      .from("accounts")
      .insert(parsed.data)
      .select("id")
      .single();

    if (error) {
      redirect(`/accounts/new?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/accounts");
    redirect(`/accounts/${data.id}?success=created`);
  } catch (error) {
    redirect(`/accounts/new?error=${encodeURIComponent(getErrorMessage(error))}`);
  }
}

export async function updateAccount(accountId: string, formData: FormData) {
  try {
    const { workspace, account } = await getAccountDetail(accountId);
    const parsed = parseAccountFormData(formData, workspace.id, account.archived);

    if (!parsed.success) {
      redirect(`/accounts/${accountId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid account data.")}`);
    }

    const { error } = await supabase
      .from("accounts")
      .update(parsed.data)
      .eq("id", accountId)
      .eq("workspace_id", workspace.id);

    if (error) {
      redirect(`/accounts/${accountId}?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/accounts");
    revalidatePath(`/accounts/${accountId}`);
    redirect(`/accounts/${accountId}?success=updated`);
  } catch (error) {
    redirect(`/accounts/${accountId}?error=${encodeURIComponent(getErrorMessage(error))}`);
  }
}

export async function toggleAccountArchive(accountId: string) {
  try {
    const { workspace, account } = await getAccountDetail(accountId);

    const { error } = await supabase
      .from("accounts")
      .update({ archived: !account.archived })
      .eq("id", accountId)
      .eq("workspace_id", workspace.id);

    if (error) {
      redirect(`/accounts/${accountId}?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/accounts");
    revalidatePath(`/accounts/${accountId}`);
    redirect(`/accounts/${accountId}?success=${account.archived ? "restored" : "archived"}`);
  } catch (error) {
    redirect(`/accounts/${accountId}?error=${encodeURIComponent(getErrorMessage(error))}`);
  }
}
