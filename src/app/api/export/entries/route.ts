import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function escapeCsv(value: string | number | null): string {
  if (value === null) {
    return "";
  }

  const stringValue = String(value);
  return `"${stringValue.replace(/"/g, "\"\"")}"`;
}

export async function GET() {
  const { data, error } = await supabase
    .from("entries")
    .select("entry_type,amount,comment,entry_at,account_id")
    .order("entry_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to build entries CSV", todo: "Finalize export implementation." },
      { status: 500 }
    );
  }

  const header = ["entry_type", "amount", "comment", "entry_at", "account_id"];
  const rows = (data ?? []).map((entry) =>
    [
      escapeCsv(entry.entry_type),
      escapeCsv(entry.amount),
      escapeCsv(entry.comment),
      escapeCsv(entry.entry_at),
      escapeCsv(entry.account_id),
    ].join(",")
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="entries.csv"',
    },
  });
}
