import { z } from "zod";

const currencyCodeSchema = z
  .string()
  .trim()
  .length(3, "Currency must be a 3-letter ISO code")
  .transform((value) => value.toUpperCase());

export const accountSchema = z.object({
  workspace_id: z.string().uuid("Invalid workspace ID"),
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  currency_code: currencyCodeSchema,
  initial_balance: z.number(),
  allow_negative: z.boolean().default(true),
  note: z
    .string()
    .trim()
    .max(50, "Note must be 50 characters or fewer")
    .nullable()
    .default(null),
  archived: z.boolean().default(false),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

export const entryTypeSchema = z.enum(["income", "expense", "adjustment"]);

export const entrySchema = z.object({
  workspace_id: z.string().uuid("Invalid workspace ID"),
  account_id: z.string().uuid("Invalid account ID"),
  entry_type: entryTypeSchema,
  amount: z.number(),
  comment: z
    .string()
    .trim()
    .max(50, "Comment must be 50 characters or fewer")
    .nullable()
    .default(null),
  entry_at: z.string().datetime("Datetime must be a valid ISO string"),
});

export type EntryFormValues = z.infer<typeof entrySchema>;
