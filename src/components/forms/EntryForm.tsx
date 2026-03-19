import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { Account, Entry, EntryType } from "@/types/database";

interface EntryFormProps {
  action: string;
  submitLabel: string;
  accounts: Account[];
  initialValues?: Partial<Entry>;
  error?: string | null;
}

function toDateTimeLocal(value: string | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function normalizedAmount(entryType: EntryType | undefined, amount: number | undefined) {
  if (typeof amount !== "number") {
    return "";
  }

  return entryType === "adjustment" ? String(amount) : String(Math.abs(amount));
}

export function EntryForm({
  action,
  submitLabel,
  accounts,
  initialValues,
  error,
}: EntryFormProps) {
  return (
    <form action={action} method="post" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account-id">Account</Label>
        <Select
          id="account-id"
          name="account_id"
          defaultValue={initialValues?.account_id ?? accounts[0]?.id ?? ""}
          required
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.currency_code})
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="entry-type">Entry type</Label>
          <Select
            id="entry-type"
            name="entry_type"
            defaultValue={initialValues?.entry_type ?? "expense"}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="adjustment">Adjustment</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={normalizedAmount(initialValues?.entry_type, initialValues?.amount)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="entry-at">Date and time</Label>
        <Input
          id="entry-at"
          name="entry_at"
          type="datetime-local"
          defaultValue={toDateTimeLocal(initialValues?.entry_at)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Input
          id="comment"
          name="comment"
          maxLength={50}
          defaultValue={initialValues?.comment ?? ""}
          placeholder="Optional comment"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
