import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { EntryForm } from "@/components/forms/EntryForm";
import { getAccounts, getEntryById } from "@/lib/server-data";

interface EntryDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const ENTRY_ERROR_MESSAGES: Record<string, string> = {
  invalid_entry: "Please review the entry fields and try again.",
  account_not_found: "The selected account could not be found.",
  comment_required_for_negative_balance:
    "A comment is required when the resulting balance becomes negative.",
  save_failed: "The entry could not be saved.",
};

const ENTRY_SUCCESS_MESSAGES: Record<string, string> = {
  updated: "Entry updated successfully.",
};

export default async function EntryDetailPage({
  params,
  searchParams,
}: EntryDetailPageProps) {
  const { id } = await params;
  const entry = await getEntryById(id);

  if (!entry) {
    notFound();
  }

  const accounts = await getAccounts();
  const paramsMap = searchParams ? await searchParams : {};
  const errorKey = typeof paramsMap.error === "string" ? paramsMap.error : "";
  const successKey = typeof paramsMap.success === "string" ? paramsMap.success : "";

  return (
    <div>
      <PageHeader
        title="Edit Entry"
        description="Update the entry details"
      />
      <Card className="max-w-lg">
        <CardContent className="space-y-4">
          {successKey && <p className="text-sm text-green-700">{ENTRY_SUCCESS_MESSAGES[successKey]}</p>}
          <EntryForm
            action={`/api/entries/${entry.id}`}
            submitLabel="Save Entry"
            accounts={accounts}
            initialValues={entry}
            error={ENTRY_ERROR_MESSAGES[errorKey] ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
