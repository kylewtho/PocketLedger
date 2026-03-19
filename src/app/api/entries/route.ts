import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseEntryFormData } from "@/lib/form-parsers";
import { calculateProjectedBalance, getAccountById, getEntries } from "@/lib/server-data";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = parseEntryFormData(formData);

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/entries/new?error=invalid_entry", request.url), 303);
  }

  const account = await getAccountById(parsed.data.account_id);

  if (!account) {
    return NextResponse.redirect(new URL("/entries/new?error=account_not_found", request.url), 303);
  }

  const existingEntries = await getEntries({ accountId: account.id });
  const projectedBalance = calculateProjectedBalance(account, existingEntries, parsed.data);

  if (projectedBalance < 0 && !parsed.data.comment) {
    return NextResponse.redirect(
      new URL("/entries/new?error=comment_required_for_negative_balance", request.url),
      303
    );
  }

  const { error } = await supabase.from("entries").insert(parsed.data);

  if (error) {
    return NextResponse.redirect(new URL("/entries/new?error=save_failed", request.url), 303);
  }

  revalidatePath("/entries");
  revalidatePath("/dashboard");
  revalidatePath(`/accounts/${account.id}`);
  return NextResponse.redirect(new URL(`/entries?success=created`, request.url), 303);
}
