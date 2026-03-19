import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseAccountFormData } from "@/lib/form-parsers";
import { DEFAULT_WORKSPACE_ID } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "archive" || intent === "unarchive") {
    const archived = intent === "archive";
    const { error } = await supabase
      .from("accounts")
      .update({ archived })
      .eq("id", id)
      .eq("workspace_id", DEFAULT_WORKSPACE_ID);

    if (error) {
      return NextResponse.redirect(new URL(`/accounts/${id}?error=account_update_failed`, request.url), 303);
    }

    revalidatePath("/accounts");
    revalidatePath(`/accounts/${id}`);
    revalidatePath("/dashboard");
    return NextResponse.redirect(
      new URL(`/accounts/${id}?success=${archived ? "archived" : "restored"}`, request.url),
      303
    );
  }

  const parsed = parseAccountFormData(formData);

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/accounts/${id}?error=invalid_account`, request.url), 303);
  }

  const { error } = await supabase
    .from("accounts")
    .update(parsed.data)
    .eq("id", id)
    .eq("workspace_id", DEFAULT_WORKSPACE_ID);

  if (error) {
    return NextResponse.redirect(new URL(`/accounts/${id}?error=account_update_failed`, request.url), 303);
  }

  revalidatePath("/accounts");
  revalidatePath(`/accounts/${id}`);
  revalidatePath("/dashboard");
  return NextResponse.redirect(new URL(`/accounts/${id}?success=updated`, request.url), 303);
}
