import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base")?.toUpperCase();
  const target = searchParams.get("target")?.toUpperCase();

  if (!base || !target) {
    return NextResponse.json(
      { error: "Missing required query params: base and target" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("exchange_rate_cache")
    .select("*")
    .eq("base_currency", base)
    .eq("target_currency", target)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        error: "Failed to read exchange rate cache",
        todo: "Add provider fetch fallback and richer retry logic.",
      },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({
      base_currency: base,
      target_currency: target,
      rate: null,
      fetched_at: null,
      source: null,
      cached: false,
      todo: "Integrate an FX provider and cache fresh responses here.",
    });
  }

  return NextResponse.json({
    ...data,
    cached: true,
    todo: "Provider fetch fallback still needs implementation.",
  });
}
