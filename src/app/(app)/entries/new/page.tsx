import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

export default function NewEntryPage() {
  return (
    <div>
      <PageHeader
        title="New Entry"
        description="Record a new financial transaction"
      />
      <Card className="max-w-lg">
        <CardContent>
          {/* TODO: Implement entry creation form */}
          <p className="text-muted-foreground">Entry form coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
