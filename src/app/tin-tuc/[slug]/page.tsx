import { ArrowLeft, CalendarDays, Clock3, Tag, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comment-section";
import { NewsCard } from "@/components/news-card";
import { newsItems } from "@/data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [article.image] },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  if (!article) notFound();

  const related = newsItems
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const publishedDate = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <>
      <article>
        <header className="bg-emerald-950 text-white">
          <div className="site-container py-14 sm:py-20">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-100/75 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Trở lại Tin tức
            </Link>
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
              {article.category}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/75">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-emerald-100/65">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" aria-hidden="true" />
                {publishedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4" aria-hidden="true" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" aria-hidden="true" />
                {article.readTime} phút đọc
              </span>
            </div>
          </div>
        </header>
        <div className="site-container -mt-1">
          <div className="relative aspect-[16/8] overflow-hidden rounded-b-3xl bg-slate-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <div className="space-y-6 text-[17px] leading-8 text-slate-700">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
            <Tag className="mr-1 size-4 text-slate-400" aria-hidden="true" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
          <CommentSection />
        </div>
      </article>

      <section className="section-space bg-slate-50">
        <div className="site-container">
          <p className="eyebrow">Có thể bạn quan tâm</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-950">
            Tin tức liên quan
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
