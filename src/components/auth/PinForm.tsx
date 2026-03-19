import { Button } from "@/components/ui/Button";

interface PinFormProps {
  action: (formData: FormData) => Promise<void>;
  error?: string;
}

export function PinForm({ action, error }: PinFormProps) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="pin" className="sr-only">
          PIN
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          placeholder="••••"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        Unlock
      </Button>
    </form>
  );
}
