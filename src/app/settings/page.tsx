import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

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
          <CardContent>
            {/* TODO: Implement PIN auth */}
            <p className="text-muted-foreground">PIN authentication coming soon.</p>
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
