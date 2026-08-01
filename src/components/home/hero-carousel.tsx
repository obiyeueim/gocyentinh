"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "future",
    eyebrow: "Tuyển sinh năm học 2026–2027",
    title: "Nơi tiềm năng được khai mở",
    description:
      "Môi trường học tập hạnh phúc, hiện đại và giàu trải nghiệm, giúp mỗi học sinh tìm thấy con đường của riêng mình.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=90",
    note: "Nhận hồ sơ lớp 10 đến ngày 15/08/2026",
  },
  {
    id: "stem",
    eyebrow: "Học tập qua trải nghiệm",
    title: "Sáng tạo để dẫn lối tương lai",
    description:
      "Chương trình STEM, Robotics và dự án liên môn đưa kiến thức ra khỏi trang sách, nuôi dưỡng năng lực giải quyết vấn đề.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=90",
    note: "04 phòng thí nghiệm và Makerspace hiện đại",
  },
  {
    id: "community",
    eyebrow: "Cộng đồng Minh Khai",
    title: "Lớn lên trong yêu thương",
    description:
      "Mỗi ngày đến trường là một hành trình trưởng thành trong tri thức, sự tự tin và tinh thần trách nhiệm với cộng đồng.",
    image:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=2000&q=90",
    note: "24 câu lạc bộ học thuật, nghệ thuật và thể thao",
  },
] as const;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [playing]);

  function goTo(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  const active = slides[activeIndex];

  return (
    <section
      className="relative isolate min-h-[670px] overflow-hidden bg-emerald-950 text-white lg:min-h-[720px]"
      aria-roledescription="carousel"
      aria-label="Thông tin nổi bật"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,44,34,.97)_0%,rgba(2,44,34,.88)_46%,rgba(2,44,34,.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,44,34,.82)_0%,transparent_45%)]" />
      <div className="absolute -left-36 bottom-20 size-[32rem] rounded-full border border-white/10" />
      <div className="absolute -left-12 bottom-44 size-80 rounded-full border border-amber-300/20" />

      <div className="site-container relative flex min-h-[670px] items-center py-16 lg:min-h-[720px]">
        <div className="max-w-3xl animate-soft-rise" key={active.id}>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300 sm:text-sm">
            {active.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {active.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-emerald-50/85 sm:text-lg">
            {active.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-50">
            <CircleCheck className="size-5 text-amber-300" aria-hidden="true" />
            {active.note}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tuyen-sinh#dang-ky"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-extrabold text-slate-950 shadow-lg shadow-black/20 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Đăng ký tuyển sinh
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/gioi-thieu"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Khám phá Minh Khai
            </Link>
          </div>
        </div>
      </div>

      <div className="site-container absolute inset-x-0 bottom-7 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-10 bg-amber-300" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Chuyển đến slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur hover:bg-white hover:text-emerald-950"
            aria-label={playing ? "Tạm dừng trình chiếu" : "Tiếp tục trình chiếu"}
          >
            {playing ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="grid size-10 place-items-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur hover:bg-white hover:text-emerald-950"
            aria-label="Slide trước"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="grid size-10 place-items-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur hover:bg-white hover:text-emerald-950"
            aria-label="Slide tiếp theo"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
