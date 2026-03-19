import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

interface AccountDetailPageProps {
  params: { id: string };
}

export default function AccountDetailPage({ params }: AccountDetailPageProps) {
  return (
    <div>
      <PageHeader
        title="Account Details"
        description={`Account ID: ${params.id}`}
      />
      <Card>
        <CardContent>
          {/* TODO: Fetch and display account details and associated entries */}
          <p className="text-muted-foreground">Account details coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
