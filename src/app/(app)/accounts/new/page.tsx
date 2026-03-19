import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

export default function NewAccountPage() {
  return (
    <div>
      <PageHeader
        title="New Account"
        description="Add a new financial account"
      />
      <Card className="max-w-lg">
        <CardContent>
          {/* TODO: Implement account creation form */}
          <p className="text-muted-foreground">Account form coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
