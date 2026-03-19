import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function EntriesPage() {
  // TODO: Fetch entries from Supabase
  const entries: unknown[] = [];

  return (
    <div>
      <PageHeader
        title="Entries"
        description="View and manage your financial entries"
        action={
          <Link href="/entries/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </Link>
        }
      />
      {entries.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No entries yet"
          description="Record your first transaction to get started."
          action={
            <Link href="/entries/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </Link>
          }
        />
      ) : (
        <div>
          {/* TODO: Render entries table */}
        </div>
      )}
    </div>
  );
}
