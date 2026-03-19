import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { createAccount } from "@/app/actions/accounts";
import { AccountForm } from "@/components/accounts/AccountForm";
import { Button } from "@/components/ui/Button";

export default async function NewAccountPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = (await searchParams) ?? {};

  return (
    <div>
      <PageHeader
        title="New Account"
        description="Add a new financial account"
        action={
          <Link href="/accounts">
            <Button variant="secondary">Back to Accounts</Button>
          </Link>
        }
      />
      <Card className="max-w-lg">
        <CardContent>
          {params.error && (
            <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
              {params.error}
            </p>
          )}
          <AccountForm action={createAccount} submitLabel="Create account" />
        </CardContent>
      </Card>
    </div>
  );
}
