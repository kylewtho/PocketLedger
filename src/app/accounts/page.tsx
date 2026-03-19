import Link from "next/link";
import { Plus, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function AccountsPage() {
  // TODO: Fetch accounts from Supabase
  const accounts: unknown[] = [];

  return (
    <div>
      <PageHeader
        title="Accounts"
        description="Manage your financial accounts"
        action={
          <Link href="/accounts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Account
            </Button>
          </Link>
        }
      />
      {accounts.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No accounts yet"
          description="Add your first account to start tracking your finances."
          action={
            <Link href="/accounts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* TODO: Render account cards */}
        </div>
      )}
    </div>
  );
}
