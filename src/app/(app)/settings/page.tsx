import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LogoutButton } from "@/components/auth/LogoutButton";

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
            {/* TODO: Implement theme switcher */}
            <p className="text-muted-foreground">Theme settings coming soon.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              PocketLedger uses a shared PIN to protect access to your data.
              {/* TODO: Add PIN change form when full user auth is implemented */}
            </p>
            <LogoutButton />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement export/import */}
            <p className="text-muted-foreground">Data management coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
