import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/currency";
import { getAccounts, getEntries } from "@/lib/server-data";

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const SUCCESS_MESSAGES: Record<string, string> = {
  created: "Entry created successfully.",
  deleted: "Entry deleted.",
};

const ERROR_MESSAGES: Record<string, string> = {
  entry_not_found: "The selected entry could not be found.",
  delete_failed: "The entry could not be deleted.",
};

interface EntriesPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function EntriesPage({ searchParams }: EntriesPageProps) {
  const entries = await getEntries();
  const accounts = await getAccounts({ includeArchived: true });
  const accountMap = new Map(accounts.map((account) => [account.id, account]));
  const params = searchParams ? await searchParams : {};
  const successKey = typeof params.success === "string" ? params.success : "";
  const errorKey = typeof params.error === "string" ? params.error : "";

  return (
    <div>
      <PageHeader
        title="Entries"
        description="View and manage your financial entries"
        action={
          <Link href="/entries/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </Link>
        }
      />
      {(successKey || errorKey) && (
        <Card className="mb-6">
          <CardContent>
            {successKey && <p className="text-sm text-green-700">{SUCCESS_MESSAGES[successKey]}</p>}
            {errorKey && <p className="text-sm text-red-600">{ERROR_MESSAGES[errorKey]}</p>}
          </CardContent>
        </Card>
      )}
      {entries.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No entries yet"
          description="Record your first transaction to get started."
          action={
            <Link href="/entries/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </Link>
          }
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {entries.map((entry) => {
              const account = accountMap.get(entry.account_id);
              const currencyCode = account?.currency_code ?? "USD";

              return (
                <div
                  key={entry.id}
                  className="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-[1fr_auto_auto]"
                >
                  <div>
                    <p className="font-medium capitalize">{entry.entry_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {account?.name ?? "Unknown account"} · {formatEntryDate(entry.entry_at)}
                    </p>
                    {entry.comment && (
                      <p className="mt-1 text-sm text-muted-foreground">{entry.comment}</p>
                    )}
                  </div>
                  <div className="font-medium md:text-right">
                    {entry.entry_type === "expense" ? "-" : ""}
                    {formatCurrency(
                      entry.entry_type === "expense" ? Math.abs(entry.amount) : entry.amount,
                      currencyCode
                    )}
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Link href={`/entries/${entry.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <form action={`/api/entries/${entry.id}`} method="post">
                      <input type="hidden" name="intent" value="delete" />
                      <Button type="submit" variant="ghost" size="sm">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
