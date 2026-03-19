import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import { BaseCurrencySelect } from "@/components/settings/BaseCurrencySelect";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your application settings"
      />
      <div className="space-y-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Display</CardTitle>
          </CardHeader>
          <CardContent>
            <BaseCurrencySelect />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Shared PIN access is active through a server-side login flow and cookie session.
              </p>
              <form action="/api/auth/logout" method="post">
                <Button type="submit" variant="secondary">
                  Log out
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>CSV export stubs are available for accounts and entries.</p>
              <p>`/api/export/accounts`</p>
              <p>`/api/export/entries`</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
