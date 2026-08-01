import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center bg-slate-50 px-4 py-20 text-center">
      <div className="max-w-xl">
        <span className="mx-auto grid size-20 place-items-center rounded-3xl bg-emerald-100 text-emerald-800">
          <SearchX className="size-9" aria-hidden="true" />
        </span>
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
          Lỗi 404
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-slate-950">
          Trang bạn tìm không tồn tại
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Đường dẫn có thể đã thay đổi hoặc nội dung chưa được xuất bản.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            <Home className="size-4" aria-hidden="true" />
            Về trang chủ
          </Link>
          <Link href="/tin-tuc" className="button-secondary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Xem tin tức
          </Link>
        </div>
      </div>
    </section>
  );
}
