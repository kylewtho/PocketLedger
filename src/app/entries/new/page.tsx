import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { EntryForm } from "@/components/forms/EntryForm";
import { getAccounts } from "@/lib/server-data";

const ENTRY_ERROR_MESSAGES: Record<string, string> = {
  invalid_entry: "Please review the entry fields and try again.",
  account_not_found: "The selected account could not be found.",
  comment_required_for_negative_balance:
    "A comment is required when the resulting balance becomes negative.",
  save_failed: "The entry could not be saved.",
};

interface NewEntryPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewEntryPage({ searchParams }: NewEntryPageProps) {
  const accounts = await getAccounts();
  const params = searchParams ? await searchParams : {};
  const errorKey = typeof params.error === "string" ? params.error : "";

  return (
    <div>
      <PageHeader
        title="New Entry"
        description="Record a new financial transaction"
      />
      <Card className="max-w-lg">
        <CardContent>
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Create an account before adding entries.
            </p>
          ) : (
            <EntryForm
              action="/api/entries"
              submitLabel="Create Entry"
              accounts={accounts}
              error={ENTRY_ERROR_MESSAGES[errorKey] ?? null}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
