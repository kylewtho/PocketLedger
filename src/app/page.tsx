import Link from "next/link";
import { PiggyBank, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 p-6">
        <PiggyBank className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to PocketLedger</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Your personal finance tracker. Keep tabs on your accounts and expenses in one place.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
