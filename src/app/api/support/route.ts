import { NextRequest, NextResponse } from "next/server";
import {
  apiError,
  checkRateLimit,
  getSessionUser,
  isSameOrigin,
} from "@/lib/support-auth";
import { createId, getSupportDb } from "@/lib/support-db";

const CONTACT_METHODS = new Set(["phone", "email", "zalo", "other"]);
const URGENCY_LEVELS = new Set(["routine", "soon", "urgent"]);

function boundedText(value: unknown, minimum: number, maximum: number): string | null {
  const text = String(value ?? "").trim();
  return text.length >= minimum && text.length <= maximum ? text : null;
}

function score(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 && number <= 42 ? number : null;
}

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) return apiError("Vui lòng đăng nhập để xem lời nhắn của bạn.", 401);

  const result = await getSupportDb()
    .prepare(
      `SELECT id, subject, description, urgency, immediate_risk, status,
              stress_depression, stress_anxiety, stress_stress, stress_summary,
              created_at, updated_at
       FROM support_requests
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 30`,
    )
    .bind(user.id)
    .all();

  return NextResponse.json({ ok: true, requests: result.results });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return apiError("Yêu cầu không hợp lệ.", 403);
  if (!(await checkRateLimit(request, "support", "submit", 10))) {
    return apiError("Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi 15 phút.", 429);
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || body.consent !== true) {
    return apiError("Bạn cần đồng ý để nhóm hỗ trợ sử dụng thông tin liên hệ.", 400);
  }

  const user = await getSessionUser(request);
  const displayName = boundedText(body.displayName ?? user?.name, 2, 80);
  const contactMethod = String(body.contactMethod ?? "");
  const contactValue = boundedText(body.contactValue ?? user?.email, 5, 160);
  const subject = boundedText(body.subject, 3, 120);
  const description = boundedText(body.description, 10, 3000);
  const requestedUrgency = String(body.urgency ?? "soon");
  const immediateRisk = body.immediateRisk === true;
  const urgency = immediateRisk ? "urgent" : requestedUrgency;
  const stressSummary = boundedText(body.stressSummary, 0, 160) ?? null;

  if (!displayName || !CONTACT_METHODS.has(contactMethod) || !contactValue || !subject || !description) {
    return apiError("Vui lòng kiểm tra lại họ tên, liên hệ và nội dung cần hỗ trợ.", 400);
  }
  if (!URGENCY_LEVELS.has(urgency)) return apiError("Mức ưu tiên không hợp lệ.", 400);

  const id = createId("req");
  await getSupportDb()
    .prepare(
      `INSERT INTO support_requests (
         id, user_id, display_name, contact_method, contact_value, subject, description,
         urgency, immediate_risk, stress_depression, stress_anxiety, stress_stress,
         stress_summary, consented_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    )
    .bind(
      id,
      user?.id ?? null,
      displayName,
      contactMethod,
      contactValue,
      subject,
      description,
      urgency,
      immediateRisk ? 1 : 0,
      score(body.stressDepression),
      score(body.stressAnxiety),
      score(body.stressStress),
      stressSummary,
    )
    .run();

  return NextResponse.json(
    {
      ok: true,
      request: { id, urgency, status: "new" },
      message: immediateRisk
        ? "Yêu cầu đã được đánh dấu khẩn cấp. Nếu bạn đang không an toàn, hãy gọi 111/115 hoặc tìm một người lớn ở cạnh ngay bây giờ."
        : "Lời nhắn đã được gửi riêng tư tới nhóm hỗ trợ.",
    },
    { status: 201 },
  );
}
