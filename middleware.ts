import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/accounts",
  "/entries",
  "/settings",
  "/api/exchange-rates",
  "/api/export",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasValidSession = await verifySessionToken(
    request.cookies.get(getSessionCookieName())?.value
  );

  if (pathname === "/login" && hasValidSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isProtectedPath(pathname) || hasValidSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/accounts/:path*", "/entries/:path*", "/settings/:path*", "/api/exchange-rates/:path*", "/api/export/:path*", "/login"],
};
