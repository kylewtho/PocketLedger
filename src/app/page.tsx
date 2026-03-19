import { PiggyBank } from "lucide-react";
import { loginWithPin } from "@/app/actions/auth";
import { PinForm } from "@/components/auth/PinForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4">
            <PiggyBank className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">PocketLedger</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Enter your PIN to access your finances.
          </p>
        </div>
        <PinForm action={loginWithPin} />
      </div>
    </div>
  );
}
