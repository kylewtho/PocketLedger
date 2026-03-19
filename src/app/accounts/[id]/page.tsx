import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AccountForm } from "@/components/forms/AccountForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getAccountById, getAccountBalance, getEntries } from "@/lib/server-data";

interface AccountDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const ACCOUNT_ERROR_MESSAGES: Record<string, string> = {
  invalid_account: "Please review the account fields and try again.",
  account_update_failed: "The account could not be updated.",
};

const ACCOUNT_SUCCESS_MESSAGES: Record<string, string> = {
  created: "Account created successfully.",
  updated: "Account updated successfully.",
  archived: "Account archived.",
  restored: "Account restored.",
};

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AccountDetailPage({ params, searchParams }: AccountDetailPageProps) {
  const { id } = await params;
  const account = await getAccountById(id);

  if (!account) {
    return (
      <div>
        <PageHeader title="Account Details" description="Account not found" />
        <Card>
          <CardContent>
            <p className="text-muted-foreground">This account does not exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const entries = await getEntries({ accountId: id });
  const balance = await getAccountBalance(id);
  const paramsMap = searchParams ? await searchParams : {};
  const errorKey = typeof paramsMap.error === "string" ? paramsMap.error : "";
  const successKey = typeof paramsMap.success === "string" ? paramsMap.success : "";

  return (
    <div className="space-y-6">
      <PageHeader
        title={account.name}
        description={`${account.currency_code} account`}
        action={
          <Link href="/entries/new">
            <Button>New Entry</Button>
          </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Edit Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Current balance</p>
              <p className="mt-1 text-3xl font-semibold">
                {formatCurrency(balance, account.currency_code)}
              </p>
            </div>

            {successKey && (
              <p className="text-sm text-green-700">{ACCOUNT_SUCCESS_MESSAGES[successKey]}</p>
            )}

            <AccountForm
              action={`/api/accounts/${account.id}`}
              submitLabel="Save Changes"
              initialValues={account}
              error={ACCOUNT_ERROR_MESSAGES[errorKey] ?? null}
            />

            <form action={`/api/accounts/${account.id}`} method="post">
              <input
                type="hidden"
                name="intent"
                value={account.archived ? "unarchive" : "archive"}
              />
              <Button type="submit" variant="secondary">
                {account.archived ? "Restore Account" : "Archive Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <EmptyState
                title="No entries for this account"
                description="Create an entry to start building the account history."
              />
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <Link
                    key={entry.id}
                    href={`/entries/${entry.id}`}
                    className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary-600/40"
                  >
                    <div>
                      <p className="font-medium capitalize">{entry.entry_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.comment || "No comment"} · {formatEntryDate(entry.entry_at)}
                      </p>
                    </div>
                    <p className="font-medium">
                      {entry.entry_type === "expense" ? "-" : ""}
                      {formatCurrency(
                        entry.entry_type === "expense" ? Math.abs(entry.amount) : entry.amount,
                        account.currency_code
                      )}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
