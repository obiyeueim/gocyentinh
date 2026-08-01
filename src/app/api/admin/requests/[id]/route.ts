import { NextRequest, NextResponse } from "next/server";
import { apiError, getSessionUser, isSameOrigin } from "@/lib/support-auth";
import { getSupportDb } from "@/lib/support-db";

const STATUSES = new Set(["new", "contacting", "in_progress", "resolved"]);

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/admin/requests/[id]">,
) {
  if (!isSameOrigin(request)) return apiError("Yêu cầu không hợp lệ.", 403);
  const user = await getSessionUser(request);
  if (!user || user.role !== "admin") return apiError("Bạn không có quyền truy cập.", 403);

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const status = String(body?.status ?? "");
  const privateNotes = String(body?.privateNotes ?? "").trim();

  if (!STATUSES.has(status)) return apiError("Trạng thái không hợp lệ.", 400);
  if (privateNotes.length > 4000) return apiError("Ghi chú tối đa 4.000 ký tự.", 400);

  const result = await getSupportDb()
    .prepare(
      `UPDATE support_requests
       SET status = ?, private_notes = ?, assigned_to = COALESCE(assigned_to, ?), updated_at = datetime('now')
       WHERE id = ?`,
    )
    .bind(status, privateNotes, user.id, id)
    .run();

  if (!result.meta.changes) return apiError("Không tìm thấy yêu cầu.", 404);
  return NextResponse.json({ ok: true });
}
