import { NextRequest, NextResponse } from "next/server";
import {
  apiError,
  checkRateLimit,
  createSession,
  isSameOrigin,
  normalizeEmail,
  setSessionCookie,
  verifyPassword,
} from "@/lib/support-auth";
import { getSupportDb } from "@/lib/support-db";

type LoginRow = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  password_hash: string;
};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return apiError("Yêu cầu không hợp lệ.", 403);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = normalizeEmail(String(body?.email ?? ""));
  const password = String(body?.password ?? "");

  if (!(await checkRateLimit(request, "login", email, 7))) {
    return apiError("Bạn đã thử quá nhiều lần. Vui lòng đợi 15 phút.", 429);
  }

  const user = await getSupportDb()
    .prepare("SELECT id, name, email, role, password_hash FROM users WHERE email = ?")
    .bind(email)
    .first<LoginRow>();

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return apiError("Email hoặc mật khẩu chưa đúng.", 401);
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  setSessionCookie(response, session);
  return response;
}
