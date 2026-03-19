import { DEFAULT_WORKSPACE_ID } from "@/lib/constants";
import { accountSchema, entrySchema } from "@/lib/validations";

export function parseAccountFormData(formData: FormData) {
  return accountSchema.safeParse({
    workspace_id: DEFAULT_WORKSPACE_ID,
    name: formData.get("name"),
    currency_code: formData.get("currency_code"),
    initial_balance: Number(formData.get("initial_balance") || 0),
    allow_negative: formData.get("allow_negative") === "on",
    note: formData.get("note") || null,
    archived: formData.get("archived") === "on",
  });
}

function toIsoDateTime(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

export function parseEntryFormData(formData: FormData) {
  const entryType = formData.get("entry_type");
  const rawAmount = Number(formData.get("amount") || 0);
  const normalizedAmount =
    entryType === "adjustment" ? rawAmount : Math.abs(rawAmount);

  return entrySchema.safeParse({
    workspace_id: DEFAULT_WORKSPACE_ID,
    account_id: formData.get("account_id"),
    entry_type: entryType,
    amount: normalizedAmount,
    comment: formData.get("comment") || null,
    entry_at: toIsoDateTime(formData.get("entry_at")),
  });
}
