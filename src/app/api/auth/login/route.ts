import { NextResponse } from "next/server";
import { createSessionToken, getSessionCookieName, verifyPin } from "@/lib/auth";

function toSafeNextPath(nextPath: FormDataEntryValue | null): string {
  if (typeof nextPath !== "string" || !nextPath.startsWith("/")) {
    return "/dashboard";
  }

  return nextPath;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawPin = formData.get("pin");
  const pin = typeof rawPin === "string" ? rawPin : "";
  const nextPath = toSafeNextPath(formData.get("next"));

  if (!(await verifyPin(pin))) {
    return NextResponse.redirect(
      new URL(`/login?error=invalid_pin&next=${encodeURIComponent(nextPath)}`, request.url),
      303
    );
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);
  response.cookies.set({
    name: getSessionCookieName(),
    value: await createSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
