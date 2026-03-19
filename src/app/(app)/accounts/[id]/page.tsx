import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AccountForm } from "@/components/accounts/AccountForm";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/currency";
import { getAccountDetail } from "@/lib/accounts";
import { toggleAccountArchive, updateAccount } from "@/app/actions/accounts";

interface AccountDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string; success?: string }>;
}

const SUCCESS_MESSAGES: Record<string, string> = {
  created: "Account created.",
  updated: "Account updated.",
  archived: "Account archived.",
  restored: "Account restored.",
};

export default async function AccountDetailPage({
  params,
  searchParams,
}: AccountDetailPageProps) {
  const { id } = await params;
  const query = (await searchParams) ?? {};
  let detail;

  try {
    detail = await getAccountDetail(id);
  } catch (error) {
    if (error instanceof Error && error.message === "Account not found.") {
      notFound();
    }

    throw error;
  }

  const { account, entries } = detail;
  const saveAccount = updateAccount.bind(null, id);
  const archiveAccount = toggleAccountArchive.bind(null, id);

  return (
    <div>
      <PageHeader
        title={account.name}
        description={`${account.currency_code} account · ${entries.length} ${entries.length === 1 ? "entry" : "entries"}`}
        action={
          <Link href="/accounts">
            <Button variant="secondary">Back to Accounts</Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Current balance</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(account.current_balance, account.currency_code)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Initial balance</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(account.initial_balance, account.currency_code)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-2 text-2xl font-semibold">
              {account.archived ? "Archived" : "Active"}
            </p>
          </CardContent>
        </Card>
      </div>

      {(query.error || query.success) && (
        <p
          className={`mb-6 rounded-md border px-3 py-2 text-sm ${
            query.error
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
              : "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200"
          }`}
        >
          {query.error ?? SUCCESS_MESSAGES[query.success ?? ""] ?? "Saved."}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Entry history</CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No entries recorded for this account yet.</p>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col gap-2 rounded-md border border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium capitalize">{entry.entry_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.comment || "No comment"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(entry.amount, account.currency_code)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat("en-AU", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(entry.entry_at))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit account</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountForm
                action={saveAccount}
                submitLabel="Save changes"
                initialValues={account}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{account.archived ? "Restore account" : "Archive account"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {account.archived
                  ? "Restoring the account will make it active again in the account list."
                  : "Archiving hides the account from normal active use without deleting its history."}
              </p>
              <form action={archiveAccount}>
                <Button variant={account.archived ? "secondary" : "danger"} type="submit">
                  {account.archived ? "Restore account" : "Archive account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
