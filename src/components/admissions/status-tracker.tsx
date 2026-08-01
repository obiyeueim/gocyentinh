"use client";

import {
  Check,
  CheckCircle2,
  CircleDot,
  FileSearch,
  Info,
  Search,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { applications } from "@/data";
import type { AdmissionApplication } from "@/types";

const statusSteps = [
  "Đã tiếp nhận",
  "Đang xét duyệt",
  "Đủ điều kiện",
  "Đã nhập học",
] as const;

export function StatusTracker() {
  const [result, setResult] = useState<AdmissionApplication | null>(null);
  const [searched, setSearched] = useState(false);

  function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = String(form.get("applicationId") ?? "").trim().toUpperCase();
    const phone = String(form.get("phone") ?? "").trim();
    setResult(
      applications.find(
        (application) =>
          application.id.toUpperCase() === id && application.phone === phone,
      ) ?? null,
    );
    setSearched(true);
  }

  const currentStep = result
    ? result.status === "Cần bổ sung"
      ? 1
      : Math.max(0, statusSteps.indexOf(result.status as (typeof statusSteps)[number]))
    : 0;

  return (
    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card lg:grid-cols-[0.8fr_1.2fr]">
      <div className="bg-emerald-950 p-7 text-white sm:p-10">
        <FileSearch className="size-10 text-amber-300" aria-hidden="true" />
        <h3 className="mt-6 font-serif text-3xl font-bold">Tra cứu hồ sơ</h3>
        <p className="mt-3 text-sm leading-7 text-emerald-50/70">
          Nhập chính xác mã hồ sơ và số điện thoại phụ huynh đã đăng ký.
        </p>
        <form onSubmit={handleLookup} className="mt-7 space-y-4">
          <div>
            <label htmlFor="tracker-id" className="mb-2 block text-sm font-bold">
              Mã hồ sơ
            </label>
            <input
              id="tracker-id"
              name="applicationId"
              required
              className="input-control border-white/20 bg-white/10 text-white placeholder:text-emerald-100/45"
              placeholder="Ví dụ: MK2026001"
              autoCapitalize="characters"
            />
          </div>
          <div>
            <label htmlFor="tracker-phone" className="mb-2 block text-sm font-bold">
              Số điện thoại phụ huynh
            </label>
            <input
              id="tracker-phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              className="input-control border-white/20 bg-white/10 text-white placeholder:text-emerald-100/45"
              placeholder="Ví dụ: 0901234567"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-extrabold text-slate-950 hover:bg-amber-300"
          >
            <Search className="size-4" aria-hidden="true" />
            Tra cứu trạng thái
          </button>
        </form>
        <div className="mt-5 flex gap-2 rounded-xl bg-white/10 p-3 text-xs leading-5 text-emerald-50/65">
          <Info className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
          Dùng dữ liệu demo: MK2026001 / 0901234567
        </div>
      </div>

      <div className="p-7 sm:p-10" aria-live="polite">
        {!searched && (
          <div className="grid min-h-80 place-items-center text-center">
            <div>
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-slate-100 text-slate-400">
                <FileSearch className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-5 font-bold text-slate-800">Trạng thái hồ sơ sẽ hiển thị tại đây</p>
              <p className="mt-2 text-sm text-slate-500">
                Thông tin được cập nhật theo từng bước xử lý.
              </p>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="grid min-h-80 place-items-center text-center">
            <div>
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-rose-50 text-rose-600">
                <FileSearch className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-5 font-bold text-slate-900">Không tìm thấy hồ sơ</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Kiểm tra lại mã hồ sơ và số điện thoại. Nếu cần hỗ trợ, vui lòng gọi
                (028) 3822 0088.
              </p>
            </div>
          </div>
        )}

        {result && (
          <div>
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Hồ sơ {result.id}
                </p>
                <h4 className="mt-2 font-serif text-2xl font-bold text-slate-950">
                  {result.studentName}
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  Đăng ký vào khối {result.desiredGrade}
                </p>
              </div>
              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold ${
                  result.status === "Cần bổ sung"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {result.status === "Cần bổ sung" ? (
                  <CircleDot className="size-4" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                )}
                {result.status}
              </span>
            </div>
            <ol className="mt-8 space-y-0" aria-label="Tiến trình xử lý hồ sơ">
              {statusSteps.map((status, index) => {
                const complete = index <= currentStep;
                return (
                  <li key={status} className="relative flex gap-4 pb-7 last:pb-0">
                    {index < statusSteps.length - 1 && (
                      <span
                        className={`absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5 ${
                          index < currentStep ? "bg-emerald-600" : "bg-slate-200"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ${
                        complete
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {complete ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : (
                        <span className="size-2 rounded-full bg-current" />
                      )}
                    </span>
                    <div className="pt-1">
                      <p className={`text-sm font-bold ${complete ? "text-slate-900" : "text-slate-400"}`}>
                        {status}
                      </p>
                      {index === currentStep && (
                        <p className="mt-1 text-xs text-slate-500">Trạng thái hiện tại</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            {result.note && (
              <div className="mt-8 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                <strong>Ghi chú:</strong> {result.note}
              </div>
            )}
            <p className="mt-5 text-xs text-slate-400">
              Cập nhật lần cuối:{" "}
              {new Intl.DateTimeFormat("vi-VN").format(new Date(result.updatedAt))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
