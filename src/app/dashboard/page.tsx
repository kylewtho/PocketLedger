import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReceiptText } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { getAccountSummaries, getEntries, getWorkspaceBaseCurrency } from "@/lib/server-data";
import { supabase } from "@/lib/supabase";

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const accountSummaries = await getAccountSummaries();
  const recentEntries = await getEntries({ limit: 5 });
  const baseCurrency = await getWorkspaceBaseCurrency();
  const groupedTotals = accountSummaries.reduce<Record<string, number>>((accumulator, account) => {
    accumulator[account.currency_code] =
      (accumulator[account.currency_code] ?? 0) + account.current_balance;
    return accumulator;
  }, {});

  let unifiedTotal = 0;
  let lastUpdated: string | null = null;

  for (const account of accountSummaries) {
    if (account.currency_code === baseCurrency) {
      unifiedTotal += account.current_balance;
      continue;
    }

    const { data } = await supabase
      .from("exchange_rate_cache")
      .select("rate,fetched_at")
      .eq("base_currency", account.currency_code)
      .eq("target_currency", baseCurrency)
      .maybeSingle();

    const rateRow = data as { rate: number; fetched_at: string } | null;

    if (rateRow?.rate) {
      unifiedTotal += account.current_balance * rateRow.rate;
      const currentLastUpdated: string = lastUpdated ?? "";
      lastUpdated =
        currentLastUpdated === "" || rateRow.fetched_at > currentLastUpdated
          ? rateRow.fetched_at
          : currentLastUpdated;
    }
  }

  const displayedGroupedTotals = Object.entries(groupedTotals);
  const totalBalanceText =
    displayedGroupedTotals.length === 1
      ? formatCurrency(displayedGroupedTotals[0][1], displayedGroupedTotals[0][0])
      : `${displayedGroupedTotals.length} currencies`;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your finances"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalBalanceText}</p>
            <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grouped Totals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {displayedGroupedTotals.map(([currencyCode, total]) => (
                <div key={currencyCode} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{currencyCode}</span>
                  <span className="font-medium">{formatCurrency(total, currencyCode)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unified Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(unifiedTotal, baseCurrency)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Base currency: {baseCurrency}.{" "}
              {lastUpdated
                ? `Rates last updated ${formatEntryDate(lastUpdated)}.`
                : "Waiting for cached exchange rates for non-base currencies."}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <EmptyState
              icon={ReceiptText}
              title="No recent entries yet"
              description="Create your first entry to populate the dashboard."
              className="py-10"
            />
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => {
                const account = accountSummaries.find((item) => item.id === entry.account_id);
                const currencyCode = account?.currency_code ?? baseCurrency;

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium capitalize">{entry.entry_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {account?.name ?? "Unknown account"} · {formatEntryDate(entry.entry_at)}
                      </p>
                    </div>
                    <p className="font-medium">
                      {entry.entry_type === "expense" ? "-" : ""}
                      {formatCurrency(
                        entry.entry_type === "expense" ? Math.abs(entry.amount) : entry.amount,
                        currencyCode
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
