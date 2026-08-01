import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/support-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({ ok: true, user: await getSessionUser(request) });
}
