"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface PinFormProps {
  action: (
    prevState: { error: string } | null,
    formData: FormData
  ) => Promise<{ error: string }>;
}

/**
 * Client-side PIN form with inline error display and loading state.
 * Uses a manual fetch approach to call the server action without depending
 * on React 19 APIs (useActionState) since this project targets React 18.
 */
export function PinForm({ action }: PinFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await action(null, formData);
      // If we reach here the action returned (not redirected) — show error
      if (result?.error) {
        setError(result.error);
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    } catch {
      // next/navigation redirect() throws — this is expected on success
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pin" className="sr-only">
          PIN
        </label>
        <input
          ref={inputRef}
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

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full"
      >
        {pending ? "Verifying…" : "Unlock"}
      </Button>
    </form>
  );
}
