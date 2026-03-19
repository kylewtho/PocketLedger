import Link from "next/link";
import { PiggyBank, ArrowRight, LockKeyhole } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 p-6">
        <PiggyBank className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to PocketLedger</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Track balances across multiple currencies with a clean starter dashboard and shared PIN access.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Go to Dashboard <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-medium transition-colors hover:bg-muted"
        >
          Login <LockKeyhole className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
