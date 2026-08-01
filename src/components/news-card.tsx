import { CalendarDays, Clock3, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/types";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function NewsCard({
  item,
  featured = false,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,23,42,0.1)] ${
        featured ? "md:grid md:grid-cols-[1.1fr_0.9fr]" : ""
      }`}
    >
      <Link
        href={`/tin-tuc/${item.slug}`}
        className={`relative block overflow-hidden ${featured ? "min-h-72" : "aspect-[16/10]"}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {item.pinned && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-slate-950 shadow">
            <Pin className="size-3" aria-hidden="true" />
            Quan trọng
          </span>
        )}
      </Link>
      <div className={featured ? "flex flex-col justify-center p-7 lg:p-9" : "p-5"}>
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
          {item.category}
        </p>
        <h3
          className={`mt-3 text-balance font-serif font-bold leading-snug text-slate-950 ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          <Link
            href={`/tin-tuc/${item.slug}`}
            className="rounded-sm transition group-hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {dateFormatter.format(new Date(item.publishedAt))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {item.readTime} phút đọc
          </span>
        </div>
      </div>
    </article>
  );
}
