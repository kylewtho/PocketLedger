import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

interface AccountDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AccountDetailPage({ params }: AccountDetailPageProps) {
  const { id } = await params;
  return (
    <div>
      <PageHeader
        title="Account Details"
        description={`Account ID: ${id}`}
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
