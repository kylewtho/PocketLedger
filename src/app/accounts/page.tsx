import Link from "next/link";
import { Plus, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/currency";
import { getAccountSummaries } from "@/lib/server-data";

export default async function AccountsPage() {
  const accounts = await getAccountSummaries({ includeArchived: true });

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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {accounts.map((account) => (
            <Link key={account.id} href={`/accounts/${account.id}`}>
              <Card className="h-full transition-colors hover:border-primary-600/40">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {account.currency_code} · {account.archived ? "Archived" : "Active"}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {account.entries_count} entries
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold">
                    {formatCurrency(account.current_balance, account.currency_code)}
                  </p>
                  {account.note && (
                    <p className="text-sm text-muted-foreground">{account.note}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
