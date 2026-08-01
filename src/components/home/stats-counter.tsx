"use client";

import { Award, Building2, GraduationCap, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 1580,
    suffix: "+",
    label: "Học sinh",
    note: "15 lớp mỗi khối",
    icon: GraduationCap,
  },
  {
    value: 96,
    suffix: "",
    label: "Giáo viên",
    note: "38% trình độ Thạc sĩ",
    icon: UsersRound,
  },
  {
    value: 148,
    suffix: "+",
    label: "Giải thưởng",
    note: "Trong 5 năm gần nhất",
    icon: Award,
  },
  {
    value: 45,
    suffix: "",
    label: "Phòng học",
    note: "100% phòng học thông minh",
    icon: Building2,
  },
] as const;

function AnimatedNumber({
  value,
  active,
}: {
  value: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      const reducedFrame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(reducedFrame);
    }

    const duration = 1300;
    const start = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <>{new Intl.NumberFormat("vi-VN").format(display)}</>;
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,#fbbf24_0,transparent_25%),radial-gradient(circle_at_80%_120%,#34d399_0,transparent_35%)]" />
      <div
        ref={sectionRef}
        className="site-container relative grid divide-y divide-white/10 py-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-4 px-4 py-7 lg:px-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-amber-300">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif text-3xl font-bold">
                  <AnimatedNumber value={stat.value} active={active} />
                  {stat.suffix}
                </p>
                <p className="mt-0.5 text-sm font-extrabold">{stat.label}</p>
                <p className="mt-1 text-xs text-emerald-100/60">{stat.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
