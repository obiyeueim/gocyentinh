import { NextRequest, NextResponse } from "next/server";
import { apiError, getSessionUser } from "@/lib/support-auth";
import { getSupportDb } from "@/lib/support-db";

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user || user.role !== "admin") return apiError("Bạn không có quyền truy cập.", 403);

  const status = request.nextUrl.searchParams.get("status") ?? "all";
  const search = request.nextUrl.searchParams.get("q")?.trim().slice(0, 80) ?? "";
  const clauses: string[] = [];
  const bindings: string[] = [];

  if (["new", "contacting", "in_progress", "resolved"].includes(status)) {
    clauses.push("support_requests.status = ?");
    bindings.push(status);
  }
  if (search) {
    clauses.push("(display_name LIKE ? OR contact_value LIKE ? OR subject LIKE ?)");
    const pattern = `%${search.replaceAll("%", "").replaceAll("_", "")}%`;
    bindings.push(pattern, pattern, pattern);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await getSupportDb()
    .prepare(
      `SELECT support_requests.*, users.email AS account_email,
              assignee.name AS assigned_name
       FROM support_requests
       LEFT JOIN users ON users.id = support_requests.user_id
       LEFT JOIN users AS assignee ON assignee.id = support_requests.assigned_to
       ${where}
       ORDER BY immediate_risk DESC,
                CASE urgency WHEN 'urgent' THEN 0 WHEN 'soon' THEN 1 ELSE 2 END,
                CASE status WHEN 'new' THEN 0 WHEN 'contacting' THEN 1 WHEN 'in_progress' THEN 2 ELSE 3 END,
                created_at DESC
       LIMIT 200`,
    )
    .bind(...bindings)
    .all();

  const totals = await getSupportDb()
    .prepare(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
              SUM(CASE WHEN immediate_risk = 1 AND status != 'resolved' THEN 1 ELSE 0 END) AS urgent_count,
              SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved_count
       FROM support_requests`,
    )
    .first();

  return NextResponse.json({ ok: true, requests: result.results, totals });
}
