"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPin, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

/** Verify the submitted PIN and set a session cookie on success. */
export async function loginWithPin(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const pin = formData.get("pin");

  if (typeof pin !== "string" || !pin.trim()) {
    return { error: "PIN is required." };
  }

  const valid = await verifyPin(pin.trim());
  if (!valid) {
    return { error: "Incorrect PIN. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  redirect("/dashboard");
}

/** Clear the session cookie and redirect to the login page. */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
