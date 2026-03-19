import { z } from "zod";

// ─── Account ──────────────────────────────────────────────────────────────────

export const accountTypeSchema = z.enum(["checking", "savings", "cash", "credit"]);

export const accountSchema = z.object({
  workspace_id: z.string().uuid("Invalid workspace ID"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  type: accountTypeSchema,
  starting_balance: z
    .number()
    .default(0),
  currency: z.string().length(3, "Currency must be a 3-letter ISO code").default("USD"),
  is_archived: z.boolean().default(false),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

// ─── Entry ────────────────────────────────────────────────────────────────────

export const entryTypeSchema = z.enum(["income", "expense"]);

export const entryCategorySchema = z.enum([
  // Income
  "Salary",
  "Freelance",
  "Other Income",
  // Expense
  "Food",
  "Transport",
  "Housing",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Other",
]);

export const entrySchema = z.object({
  account_id: z.string().uuid("Invalid account ID"),
  type: entryTypeSchema,
  amount: z
    .number()
    .positive("Amount must be greater than 0"),
  category: entryCategorySchema,
  description: z.string().max(500, "Description is too long").nullable().default(null),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type EntryFormValues = z.infer<typeof entrySchema>;
