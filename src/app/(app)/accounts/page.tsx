import Link from "next/link";
import { Plus, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/currency";
import { getAccountsWithBalances } from "@/lib/accounts";

export default async function AccountsPage() {
  const { accounts } = await getAccountsWithBalances();

  return (
    <div>
      <PageHeader
        title="Accounts"
        description="Manage your financial accounts"
        action={
          <Link href="/accounts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Account
            </Button>
          </Link>
        }
      />
      {accounts.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No accounts yet"
          description="Add your first account to start tracking your finances."
          action={
            <Link href="/accounts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {accounts.map((account) => (
            <Link key={account.id} href={`/accounts/${account.id}`} className="block">
              <Card className="transition-colors hover:border-blue-500/40">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle>{account.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {account.currency_code}
                      {account.note ? ` · ${account.note}` : ""}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      account.archived
                        ? "bg-muted text-muted-foreground"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                    }`}
                  >
                    {account.archived ? "Archived" : "Active"}
                  </span>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current balance</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {formatCurrency(account.current_balance, account.currency_code)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {account.entry_count} {account.entry_count === 1 ? "entry" : "entries"}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
