"use client";

import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Box,
  CheckCircle2,
  Expand,
  FlaskConical,
  LibraryBig,
  Rotate3D,
  School,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Facility, FacilityCategory } from "@/types";

const categoryIcons: Record<FacilityCategory, typeof LibraryBig> = {
  "Thư viện": LibraryBig,
  "Phòng học": School,
  "Phòng thí nghiệm": FlaskConical,
  "Xe đưa đón": UsersRound,
};

export function FacilityExplorer({ facilities }: { facilities: Facility[] }) {
  const [activeId, setActiveId] = useState(facilities[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const active = facilities.find((item) => item.id === activeId) ?? facilities[0];
  const ActiveIcon = categoryIcons[active.category];

  function selectFacility(id: string) {
    setActiveId(id);
    setImageIndex(0);
    setTourActive(false);
  }

  return (
    <div>
      <div
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
        role="tablist"
        aria-label="Danh mục cơ sở vật chất"
      >
        {facilities.map((facility) => {
          const Icon = categoryIcons[facility.category];
          const selected = active.id === facility.id;
          return (
            <button
              key={facility.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="facility-panel"
              onClick={() => selectFacility(facility.id)}
              className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border px-3 text-center text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                selected
                  ? "border-emerald-800 bg-emerald-800 text-white shadow-lg shadow-emerald-900/15"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Icon className="size-5" aria-hidden="true" />
              {facility.category}
            </button>
          );
        })}
      </div>

      <div
        id="facility-panel"
        role="tabpanel"
        className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card"
      >
        <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[360px] overflow-hidden bg-slate-100 lg:min-h-[540px]">
            <Image
              key={`${active.id}-${imageIndex}`}
              src={active.images[imageIndex]}
              alt={`${active.name} – hình ${imageIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="animate-soft-rise object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5 pt-24 text-white">
              <p className="text-xs font-bold">
                {imageIndex + 1} / {active.images.length}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur hover:bg-white hover:text-slate-950"
                aria-label="Mở ảnh toàn màn hình (mô phỏng)"
              >
                <Expand className="size-4" aria-hidden="true" />
                Toàn màn hình
              </button>
            </div>
            <div className="absolute inset-y-0 left-3 flex items-center">
              <button
                type="button"
                onClick={() =>
                  setImageIndex(
                    (index) => (index - 1 + active.images.length) % active.images.length,
                  )
                }
                className="grid size-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white"
                aria-label="Ảnh trước"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={() =>
                  setImageIndex((index) => (index + 1) % active.images.length)
                }
                className="grid size-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white"
                aria-label="Ảnh tiếp theo"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ActiveIcon className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              {active.category}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold text-slate-950">
              {active.name}
            </h3>
            <p className="mt-4 leading-7 text-slate-600">{active.description}</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {active.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                  <p className="mt-2 text-xs font-bold leading-5 text-slate-700">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-slate-200 pt-6">
              <p className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Accessibility className="size-5 text-emerald-700" aria-hidden="true" />
                Khả năng tiếp cận
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {active.accessibility.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {active.virtualTourAvailable && (
              <button
                type="button"
                onClick={() => setTourActive(true)}
                className="button-primary mt-7 w-full"
              >
                <Rotate3D className="size-5" aria-hidden="true" />
                Khám phá tour 360°
              </button>
            )}
          </div>
        </div>

        {tourActive && (
          <div className="border-t border-slate-200 bg-emerald-950 p-5 sm:p-8">
            <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(circle_at_center,#047857_0%,#022c22_62%)] text-center text-white">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:48px_48px]" />
              <div className="relative max-w-md px-5">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-amber-300 text-emerald-950">
                  <Box className="size-8" aria-hidden="true" />
                </span>
                <h4 className="mt-5 font-serif text-2xl font-bold">Trình xem tour 360°</h4>
                <p className="mt-3 text-sm leading-6 text-emerald-50/70">
                  Placeholder sẵn sàng kết nối ảnh panorama hoặc dịch vụ virtual
                  tour của nhà trường.
                </p>
                <button
                  type="button"
                  onClick={() => setTourActive(false)}
                  className="mt-5 rounded-lg border border-white/25 px-4 py-2 text-xs font-bold hover:bg-white hover:text-emerald-950"
                >
                  Đóng trình xem
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {active.images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setImageIndex(index)}
            aria-label={`Xem ảnh ${index + 1} của ${active.name}`}
            aria-pressed={imageIndex === index}
            className={`relative aspect-[16/9] overflow-hidden rounded-xl ring-offset-2 ${
              imageIndex === index ? "ring-2 ring-emerald-700" : "opacity-65 hover:opacity-100"
            }`}
          >
            <Image src={image} alt="" fill sizes="33vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
