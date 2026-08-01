import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  Map,
  School,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { StatsCounter } from "@/components/home/stats-counter";
import { VideoStory } from "@/components/home/video-story";
import { NewsCard } from "@/components/news-card";
import { SectionHeading, TextLink } from "@/components/ui";
import { events, newsItems } from "@/data";

export const metadata: Metadata = {
  title: "Trang chủ",
};

const quickLinks = [
  {
    title: "Tuyển sinh 2026",
    description: "Chỉ tiêu, học phí và hồ sơ",
    href: "/tuyen-sinh",
    icon: FileCheck2,
  },
  {
    title: "Tra cứu hồ sơ",
    description: "Theo dõi trạng thái trực tuyến",
    href: "/tuyen-sinh#tra-cuu",
    icon: CheckCircle2,
  },
  {
    title: "Lịch học hôm nay",
    description: "Thời khóa biểu và lịch thi",
    href: "/lich-hoc",
    icon: CalendarDays,
  },
  {
    title: "Tham quan trường",
    description: "Không gian học tập hiện đại",
    href: "/co-so-vat-chat",
    icon: Map,
  },
];

const formatEventDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("vi-VN", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("vi-VN", { month: "short" })
      .format(date)
      .replace("thg ", "TH "),
  };
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="relative z-10 -mt-px border-b border-slate-200 bg-white">
        <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-32 items-center gap-4 border-b border-slate-200 px-4 py-5 transition hover:bg-emerald-50 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold text-slate-900">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {item.description}
                  </span>
                </span>
                <ArrowRight
                  className="ml-auto size-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Tin mới nhất"
              title="Chuyện đang diễn ra tại Minh Khai"
              description="Cập nhật thông báo quan trọng, hoạt động học tập và những dấu ấn đáng tự hào của thầy trò nhà trường."
            />
            <TextLink href="/tin-tuc">Xem tất cả tin tức</TextLink>
          </div>
          <div className="mt-10">
            <NewsCard item={newsItems[0]} featured />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {newsItems.slice(1, 4).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sự kiện sắp tới"
              title="Gặp gỡ, kết nối và cùng nhau trưởng thành"
              description="Đừng bỏ lỡ các hoạt động học thuật, ngoại khóa và chương trình dành cho gia đình Minh Khai."
            />
            <div className="mt-8 space-y-3">
              {events.slice(0, 3).map((event) => {
                const date = formatEventDate(event.startDate);
                return (
                  <article
                    key={event.id}
                    className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-emerald-800 text-center text-white">
                      <span>
                        <span className="block font-serif text-2xl font-bold leading-none">
                          {date.day}
                        </span>
                        <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-wide text-emerald-100">
                          {date.month}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 py-0.5">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-700">
                        {event.type} · {event.time}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800">
                        {event.title}
                      </h3>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {event.location}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-7">
              <TextLink href="/lich-hoc">Xem lịch đầy đủ</TextLink>
            </div>
          </div>
          <VideoStory />
        </div>
      </section>

      <StatsCounter />

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-100 p-8 sm:p-12">
            <div className="absolute -right-14 -top-14 size-56 rounded-full border-[30px] border-white/40" />
            <School className="size-12 text-emerald-800" aria-hidden="true" />
            <p className="mt-8 max-w-xl font-serif text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl">
              “Giáo dục không chỉ chuẩn bị cho tương lai. Giáo dục kiến tạo tương
              lai.”
            </p>
            <p className="mt-5 text-sm font-bold text-emerald-800">
              — TS. Nguyễn Thanh Hà, Hiệu trưởng
            </p>
          </div>
          <div className="lg:pl-8">
            <SectionHeading
              eyebrow="Vì sao chọn Minh Khai"
              title="Một hành trình học tập được thiết kế quanh mỗi học sinh"
              description="Chúng tôi kết hợp nền tảng học thuật vững chắc với trải nghiệm đa dạng và sự đồng hành cá nhân hóa."
            />
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "Lộ trình học tập cá nhân hóa",
                "Giáo viên tận tâm, chuyên môn cao",
                "Hệ sinh thái STEM & ngoại ngữ",
                "Tư vấn hướng nghiệp từ lớp 10",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/gioi-thieu" className="button-primary mt-8">
              Tìm hiểu về nhà trường
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-amber-300">
        <div className="site-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-950/65">
              Sẵn sàng bắt đầu?
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-950">
              Cùng con mở cánh cửa tương lai tại Minh Khai
            </h2>
          </div>
          <Link
            href="/tuyen-sinh#dang-ky"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-950 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800"
          >
            Đăng ký tuyển sinh
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
