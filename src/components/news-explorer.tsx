"use client";

import { Grid2X2, ImageIcon, ListFilter, Play, Search, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { mediaItems, newsItems } from "@/data";
import type { NewsCategory } from "@/types";
import { NewsCard } from "./news-card";
import { EmptyState } from "./ui";

const categories: Array<"Tất cả" | NewsCategory> = [
  "Tất cả",
  "Tin nhà trường",
  "Tin giáo dục",
  "Thành tích",
  "Ngoại khóa",
  "Cuộc thi",
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("vi");
}

export function NewsExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Tất cả");

  const filteredNews = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return newsItems.filter((item) => {
      const matchesCategory =
        activeCategory === "Tất cả" || item.category === activeCategory;
      const searchable = normalize(
        `${item.title} ${item.excerpt} ${item.tags.join(" ")}`,
      );
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const filteredMedia = useMemo(
    () =>
      activeCategory === "Tất cả"
        ? mediaItems
        : mediaItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <div className="sticky top-[76px] z-20 border-y border-slate-200 bg-white/95 backdrop-blur-lg lg:top-[112px]">
        <div className="site-container py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="news-search" className="sr-only">
                Tìm kiếm tin tức
              </label>
              <input
                id="news-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="input-control pr-11 pl-12"
                placeholder="Tìm theo tiêu đề, nội dung hoặc từ khóa..."
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:max-w-[67%]">
              <ListFilter className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-extrabold transition ${
                    activeCategory === category
                      ? "bg-emerald-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section-space">
        <div className="site-container">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Tin bài</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-950">
                {activeCategory === "Tất cả" ? "Tất cả tin tức" : activeCategory}
              </h2>
            </div>
            <p className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
              {filteredNews.length} kết quả
            </p>
          </div>
          {filteredNews.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="Không tìm thấy bài viết phù hợp"
                description="Thử dùng từ khóa ngắn hơn hoặc chọn một chuyên mục khác."
              />
            </div>
          )}
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Thư viện truyền thông</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-950 sm:text-4xl">
                Khoảnh khắc Minh Khai
              </h2>
            </div>
            <Grid2X2 className="size-7 text-slate-300" aria-hidden="true" />
          </div>
          {filteredMedia.length > 0 ? (
            <div className="mt-9 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {filteredMedia.map((item, index) => (
                <article
                  key={item.id}
                  className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-emerald-950"
                >
                  <div
                    className={
                      index % 3 === 1 ? "relative aspect-[4/5]" : "relative aspect-[4/3]"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-300">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-serif text-xl font-bold">{item.title}</h3>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                        {item.type === "Video" ? (
                          <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
                        ) : (
                          <ImageIcon className="size-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">{item.type}</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="Chưa có album trong chuyên mục này"
                description="Hãy chọn Tất cả để xem toàn bộ ảnh và video."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
