import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { Account } from "@/types/database";

interface AccountFormProps {
  action: string;
  submitLabel: string;
  initialValues?: Partial<Account>;
  error?: string | null;
}

function formatAmount(value: number | undefined) {
  return typeof value === "number" ? String(value) : "0";
}

export function AccountForm({
  action,
  submitLabel,
  initialValues,
  error,
}: AccountFormProps) {
  return (
    <form action={action} method="post" className="space-y-4">
      <input
        type="hidden"
        name="archived"
        value={initialValues?.archived ? "on" : ""}
      />
      <div className="space-y-2">
        <Label htmlFor="account-name">Account name</Label>
        <Input
          id="account-name"
          name="name"
          defaultValue={initialValues?.name ?? ""}
          placeholder="HSBC AUD"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currency-code">Currency code</Label>
          <Input
            id="currency-code"
            name="currency_code"
            maxLength={3}
            defaultValue={initialValues?.currency_code ?? ""}
            className="uppercase"
            placeholder="AUD"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="initial-balance">Initial balance</Label>
          <Input
            id="initial-balance"
            name="initial_balance"
            type="number"
            step="0.01"
            defaultValue={formatAmount(initialValues?.initial_balance)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Input
          id="note"
          name="note"
          maxLength={50}
          defaultValue={initialValues?.note ?? ""}
          placeholder="Optional short note"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="allow_negative"
          defaultChecked={initialValues?.allow_negative ?? true}
        />
        Allow negative balance
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
