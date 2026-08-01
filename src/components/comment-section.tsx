"use client";

import { CheckCircle2, Clock3, MessageSquareText, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

export function CommentSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-14 border-t border-slate-200 pt-10">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
          <MessageSquareText className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="comments-heading" className="font-serif text-2xl font-bold text-slate-950">
            Bình luận
          </h2>
          <p className="text-xs text-slate-500">02 ý kiến đã được duyệt</p>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <article className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold text-slate-900">Phụ huynh Hoàng Minh</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-800">
              <CheckCircle2 className="size-3" aria-hidden="true" />
              Đã duyệt
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Cảm ơn nhà trường đã cập nhật thông tin rất đầy đủ. Gia đình sẽ tham gia
            Open Day để tìm hiểu thêm về chương trình STEM.
          </p>
          <time className="mt-3 block text-xs text-slate-400">25/06/2026 · 09:30</time>
        </article>
        <article className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold text-slate-900">Cựu học sinh Minh Châu</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-800">
              <CheckCircle2 className="size-3" aria-hidden="true" />
              Đã duyệt
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Chúc các em học sinh có một năm học mới thật nhiều trải nghiệm và kỷ
            niệm đẹp dưới mái trường Minh Khai.
          </p>
          <time className="mt-3 block text-xs text-slate-400">24/06/2026 · 20:15</time>
        </article>
      </div>

      {submitted ? (
        <div
          className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5"
          role="status"
        >
          <div className="flex gap-3">
            <Clock3 className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div>
              <p className="font-bold text-amber-950">Bình luận đang chờ kiểm duyệt</p>
              <p className="mt-1 text-sm leading-6 text-amber-900/70">
                Cảm ơn bạn đã chia sẻ. Bình luận sẽ xuất hiện sau khi được quản trị
                viên duyệt.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-200 p-5 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <ShieldCheck className="size-4 text-emerald-700" aria-hidden="true" />
            Bình luận được kiểm duyệt trước khi hiển thị
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="comment-name" className="field-label">
                Họ và tên <span aria-hidden="true">*</span>
              </label>
              <input id="comment-name" required className="input-control" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="comment-email" className="field-label">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="comment-email"
                type="email"
                required
                className="input-control"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="comment-message" className="field-label">
              Nội dung bình luận <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="comment-message"
              required
              minLength={10}
              rows={5}
              className="input-control resize-y"
              placeholder="Chia sẻ ý kiến của bạn..."
            />
          </div>
          <button type="submit" className="button-primary mt-5">
            Gửi bình luận
          </button>
        </form>
      )}
    </section>
  );
}
