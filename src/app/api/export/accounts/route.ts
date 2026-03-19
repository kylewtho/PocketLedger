import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function escapeCsv(value: string | number | boolean | null): string {
  if (value === null) {
    return "";
  }

  const stringValue = String(value);
  return `"${stringValue.replace(/"/g, "\"\"")}"`;
}

export async function GET() {
  const { data, error } = await supabase
    .from("accounts")
    .select("name,currency_code,initial_balance,allow_negative,note,archived")
    .order("name");

  if (error) {
    return NextResponse.json(
      { error: "Failed to build accounts CSV", todo: "Finalize export implementation." },
      { status: 500 }
    );
  }

  const header = ["name", "currency_code", "initial_balance", "allow_negative", "note", "archived"];
  const rows = (data ?? []).map((account) =>
    [
      escapeCsv(account.name),
      escapeCsv(account.currency_code),
      escapeCsv(account.initial_balance),
      escapeCsv(account.allow_negative),
      escapeCsv(account.note),
      escapeCsv(account.archived),
    ].join(",")
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="accounts.csv"',
    },
  });
}
