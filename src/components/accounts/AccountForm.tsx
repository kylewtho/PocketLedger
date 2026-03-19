import { Button } from "@/components/ui/Button";
import type { Account } from "@/types/database";

interface AccountFormProps {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialValues?: Partial<Account>;
}

export function AccountForm({
  action,
  submitLabel,
  initialValues,
}: AccountFormProps) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Account name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initialValues?.name ?? ""}
            placeholder="e.g. HSBC AUD"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="currency_code" className="mb-2 block text-sm font-medium">
            Currency code
          </label>
          <input
            id="currency_code"
            name="currency_code"
            type="text"
            required
            maxLength={3}
            defaultValue={initialValues?.currency_code ?? ""}
            placeholder="USD"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm uppercase"
          />
        </div>

        <div>
          <label htmlFor="initial_balance" className="mb-2 block text-sm font-medium">
            Initial balance
          </label>
          <input
            id="initial_balance"
            name="initial_balance"
            type="number"
            step="0.01"
            defaultValue={initialValues?.initial_balance ?? 0}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="note" className="mb-2 block text-sm font-medium">
            Note
          </label>
          <input
            id="note"
            name="note"
            type="text"
            maxLength={50}
            defaultValue={initialValues?.note ?? ""}
            placeholder="Optional short note"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Up to 50 characters.
          </p>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-md border border-border px-3 py-3 text-sm">
        <input
          name="allow_negative"
          type="checkbox"
          defaultChecked={initialValues?.allow_negative ?? true}
          className="h-4 w-4 rounded border-border"
        />
        Allow the balance to go negative
      </label>

      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
