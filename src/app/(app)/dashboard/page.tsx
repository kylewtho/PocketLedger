import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your finances"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">+$0.00</p>
            <p className="text-sm text-muted-foreground mt-1">Net income</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-1">Active accounts</p>
          </CardContent>
        </Card>
      </div>
      {/* TODO: Add recent transactions, charts, etc. */}
    </div>
  );
}
