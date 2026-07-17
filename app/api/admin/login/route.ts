// app/api/admin/login/route.ts

import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches SESSION_DURATION_MS
  });

  return response;
}
