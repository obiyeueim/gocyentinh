import { NextRequest, NextResponse } from "next/server";
import {
  apiError,
  checkRateLimit,
  createSession,
  hashPassword,
  isSameOrigin,
  normalizeEmail,
  setSessionCookie,
  validEmail,
  validPassword,
} from "@/lib/support-auth";
import { createId, getSupportDb } from "@/lib/support-db";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return apiError("Yêu cầu không hợp lệ.", 403);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = String(body?.name ?? "").trim();
  const email = normalizeEmail(String(body?.email ?? ""));
  const password = String(body?.password ?? "");

  if (name.length < 2 || name.length > 80) return apiError("Họ tên cần từ 2 đến 80 ký tự.", 400);
  if (!validEmail(email)) return apiError("Email không hợp lệ.", 400);
  if (!validPassword(password)) return apiError("Mật khẩu cần từ 10 đến 128 ký tự.", 400);
  if (!(await checkRateLimit(request, "register", email, 5))) {
    return apiError("Bạn đã thử quá nhiều lần. Vui lòng đợi 15 phút.", 429);
  }

  const id = createId("usr");
  try {
    await getSupportDb()
      .prepare("INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)")
      .bind(id, name, email, await hashPassword(password))
      .run();
  } catch (error) {
    if (String(error).toLowerCase().includes("unique")) {
      return apiError("Email này đã có tài khoản.", 409);
    }
    throw error;
  }

  const session = await createSession(id);
  const response = NextResponse.json({ ok: true, user: { id, name, email, role: "user" } }, { status: 201 });
  setSessionCookie(response, session);
  return response;
}
