import { NextRequest, NextResponse } from "next/server";
import { deleteSession, isSameOrigin, SESSION_COOKIE } from "@/lib/support-auth";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  await deleteSession(request);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/", sameSite: "strict" });
  return response;
}
