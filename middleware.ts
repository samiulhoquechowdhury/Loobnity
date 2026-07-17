// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export const config = {
  runtime: "nodejs", // needed for Node's `crypto` module used in lib/auth.ts
  matcher: ["/admin/:path*"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never gate the login page itself, or you can't reach it to log in
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  if (!verifySessionToken(token)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
