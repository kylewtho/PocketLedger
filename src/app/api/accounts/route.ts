import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseAccountFormData } from "@/lib/form-parsers";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = parseAccountFormData(formData);

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/accounts/new?error=invalid_account", request.url), 303);
  }

  const { error, data } = await supabase
    .from("accounts")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.redirect(new URL("/accounts/new?error=save_failed", request.url), 303);
  }

  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  return NextResponse.redirect(new URL(`/accounts/${data.id}?success=created`, request.url), 303);
}
