import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { AccountForm } from "@/components/forms/AccountForm";

const ACCOUNT_ERROR_MESSAGES: Record<string, string> = {
  invalid_account: "Please review the account fields and try again.",
  save_failed: "The account could not be saved.",
};

interface NewAccountPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewAccountPage({ searchParams }: NewAccountPageProps) {
  const params = searchParams ? await searchParams : {};
  const errorKey = typeof params.error === "string" ? params.error : "";

  return (
    <div>
      <PageHeader
        title="New Account"
        description="Add a new financial account"
      />
      <Card className="max-w-lg">
        <CardContent>
          <AccountForm
            action="/api/accounts"
            submitLabel="Create Account"
            error={ACCOUNT_ERROR_MESSAGES[errorKey] ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
