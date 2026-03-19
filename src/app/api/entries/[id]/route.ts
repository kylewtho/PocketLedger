import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseEntryFormData } from "@/lib/form-parsers";
import { calculateProjectedBalance, getAccountById, getEntries, getEntryById } from "@/lib/server-data";
import { DEFAULT_WORKSPACE_ID } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const formData = await request.formData();
  const intent = formData.get("intent");
  const existingEntry = await getEntryById(id);

  if (!existingEntry) {
    return NextResponse.redirect(new URL("/entries?error=entry_not_found", request.url), 303);
  }

  if (intent === "delete") {
    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .eq("workspace_id", DEFAULT_WORKSPACE_ID);

    if (error) {
      return NextResponse.redirect(new URL("/entries?error=delete_failed", request.url), 303);
    }

    revalidatePath("/entries");
    revalidatePath("/dashboard");
    revalidatePath(`/accounts/${existingEntry.account_id}`);
    return NextResponse.redirect(new URL("/entries?success=deleted", request.url), 303);
  }

  const parsed = parseEntryFormData(formData);

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/entries/${id}?error=invalid_entry`, request.url), 303);
  }

  const account = await getAccountById(parsed.data.account_id);

  if (!account) {
    return NextResponse.redirect(new URL(`/entries/${id}?error=account_not_found`, request.url), 303);
  }

  const existingEntries = await getEntries({ accountId: account.id });
  const projectedBalance = calculateProjectedBalance(account, existingEntries, parsed.data, id);

  if (projectedBalance < 0 && !parsed.data.comment) {
    return NextResponse.redirect(
      new URL(`/entries/${id}?error=comment_required_for_negative_balance`, request.url),
      303
    );
  }

  const { error } = await supabase
    .from("entries")
    .update(parsed.data)
    .eq("id", id)
    .eq("workspace_id", DEFAULT_WORKSPACE_ID);

  if (error) {
    return NextResponse.redirect(new URL(`/entries/${id}?error=save_failed`, request.url), 303);
  }

  revalidatePath("/entries");
  revalidatePath("/dashboard");
  revalidatePath(`/accounts/${account.id}`);
  revalidatePath(`/accounts/${existingEntry.account_id}`);
  revalidatePath(`/entries/${id}`);
  return NextResponse.redirect(new URL(`/entries/${id}?success=updated`, request.url), 303);
}
