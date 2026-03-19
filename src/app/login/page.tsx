import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";

interface LoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get(getSessionCookieName())?.value;

  if (await verifySessionToken(existingSession)) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = typeof resolvedSearchParams.error === "string" ? resolvedSearchParams.error : null;
  const nextPath = typeof resolvedSearchParams.next === "string" ? resolvedSearchParams.next : "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>PocketLedger Access</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the shared numeric PIN to continue.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/login" method="post" className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />
            <div className="space-y-2">
              <label htmlFor="pin" className="text-sm font-medium">
                Numeric PIN
              </label>
              <input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                placeholder="Enter PIN"
              />
            </div>
            {error === "invalid_pin" && (
              <p className="text-sm text-red-600">The PIN was not accepted.</p>
            )}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
