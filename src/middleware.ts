/**
 * Route protection middleware.
 *
 * All routes under /dashboard, /accounts, /entries, and /settings require a
 * valid session cookie. Unauthenticated requests are redirected to the login
 * page at /.
 *
 * TODO: Upgrade to full user authentication (e.g. NextAuth.js) when
 *       multi-user support or per-user data isolation is needed.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token || !(await verifySessionToken(token))) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to the private app routes
  matcher: [
    "/dashboard/:path*",
    "/accounts/:path*",
    "/entries/:path*",
    "/settings/:path*",
  ],
};
