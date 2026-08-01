"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  MapPin,
  PartyPopper,
  Search,
  Umbrella,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ScheduleItem, ScheduleType } from "@/types";
import { EmptyState } from "./ui";

const typeStyles: Record<
  ScheduleType,
  { icon: typeof BookOpen; color: string; dot: string }
> = {
  "Lịch học": {
    icon: BookOpen,
    color: "border-blue-200 bg-blue-50 text-blue-900",
    dot: "bg-blue-500",
  },
  "Lịch thi": {
    icon: GraduationCap,
    color: "border-rose-200 bg-rose-50 text-rose-900",
    dot: "bg-rose-500",
  },
  "Ngày nghỉ": {
    icon: Umbrella,
    color: "border-amber-200 bg-amber-50 text-amber-900",
    dot: "bg-amber-500",
  },
  "Sự kiện": {
    icon: PartyPopper,
    color: "border-emerald-200 bg-emerald-50 text-emerald-900",
    dot: "bg-emerald-500",
  },
};

const filters: Array<"Tất cả" | ScheduleType> = [
  "Tất cả",
  "Lịch học",
  "Lịch thi",
  "Ngày nghỉ",
  "Sự kiện",
];

const weekDays = [
  { date: "2026-08-03", day: "Thứ Hai", short: "T2", number: "03" },
  { date: "2026-08-04", day: "Thứ Ba", short: "T3", number: "04" },
  { date: "2026-08-05", day: "Thứ Tư", short: "T4", number: "05" },
  { date: "2026-08-06", day: "Thứ Năm", short: "T5", number: "06" },
  { date: "2026-08-07", day: "Thứ Sáu", short: "T6", number: "07" },
  { date: "2026-08-08", day: "Thứ Bảy", short: "T7", number: "08" },
] as const;

export function ScheduleCalendar({ items }: { items: ScheduleItem[] }) {
  const [activeType, setActiveType] = useState<(typeof filters)[number]>("Tất cả");
  const [selectedDate, setSelectedDate] = useState("2026-08-03");
  const [classFilter, setClassFilter] = useState("Tất cả");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items
        .filter((item) => item.date === selectedDate)
        .filter((item) => activeType === "Tất cả" || item.type === activeType)
        .filter(
          (item) =>
            classFilter === "Tất cả" ||
            item.className === classFilter ||
            item.className?.includes(classFilter),
        )
        .filter((item) =>
          `${item.title} ${item.teacher ?? ""} ${item.location ?? ""}`
            .toLocaleLowerCase("vi")
            .includes(query.toLocaleLowerCase("vi")),
        )
        .sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? "")),
    [activeType, classFilter, items, query, selectedDate],
  );

  const selectedDay = weekDays.find((day) => day.date === selectedDate) ?? weekDays[0];

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Tuần trước (mô phỏng)"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="min-w-44 text-center">
              <p className="font-serif text-xl font-bold text-slate-950">03 – 08/08/2026</p>
              <p className="mt-0.5 text-xs text-slate-500">Tuần định hướng hè</p>
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Tuần sau (mô phỏng)"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <label htmlFor="class-filter" className="sr-only">
              Lọc theo lớp
            </label>
            <select
              id="class-filter"
              className="input-control min-h-10 w-auto py-2 text-sm"
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
            >
              <option>Tất cả</option>
              <option>10A1</option>
              <option>10A2</option>
              <option>Khối 10</option>
            </select>
            <div className="relative min-w-52 flex-1">
              <Search
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="schedule-search" className="sr-only">
                Tìm trong lịch
              </label>
              <input
                id="schedule-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="input-control min-h-10 py-2 pr-3 pl-9 text-sm"
                placeholder="Tìm môn, giáo viên..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {weekDays.map((day) => {
            const selected = day.date === selectedDate;
            const count = items.filter((item) => item.date === day.date).length;
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelectedDate(day.date)}
                aria-pressed={selected}
                className={`relative rounded-2xl border px-2 py-4 text-center transition ${
                  selected
                    ? "border-emerald-800 bg-emerald-800 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                }`}
              >
                <span className="block text-[10px] font-extrabold uppercase tracking-wide sm:hidden">
                  {day.short}
                </span>
                <span className="hidden text-[10px] font-extrabold uppercase tracking-wide sm:block">
                  {day.day}
                </span>
                <span className="mt-1 block font-serif text-2xl font-bold">{day.number}</span>
                {count > 0 && (
                  <span
                    className={`absolute right-2 top-2 size-2 rounded-full ${
                      selected ? "bg-amber-300" : "bg-emerald-500"
                    }`}
                    aria-label={`${count} mục trong ngày`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Lọc loại lịch">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveType(filter)}
              aria-pressed={activeType === filter}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold ${
                activeType === filter
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{selectedDay.day}</p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-slate-950">
              Ngày {selectedDay.number} tháng 08
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
            {filtered.length} mục
          </span>
        </div>
        {filtered.length > 0 ? (
          <div className="mt-6 space-y-3">
            {filtered.map((item) => {
              const style = typeStyles[item.type];
              const Icon = style.icon;
              return (
                <article
                  key={item.id}
                  className={`grid gap-4 rounded-2xl border p-5 sm:grid-cols-[130px_1fr_auto] sm:items-center ${style.color}`}
                >
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide">
                      <Icon className="size-4" aria-hidden="true" />
                      {item.type}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 font-mono text-sm font-bold">
                      <Clock3 className="size-4" aria-hidden="true" />
                      {item.startTime
                        ? `${item.startTime} – ${item.endTime ?? ""}`
                        : "Cả ngày"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold">{item.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs opacity-70">
                      {item.teacher && (
                        <span className="inline-flex items-center gap-1.5">
                          <UserRound className="size-3.5" aria-hidden="true" />
                          {item.teacher}
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" aria-hidden="true" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.className && (
                    <span className="w-fit rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold">
                      {item.className}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="Không có lịch phù hợp"
              description="Thử chọn ngày khác hoặc bỏ bớt điều kiện lọc."
            />
          </div>
        )}
      </div>
    </div>
  );
}
