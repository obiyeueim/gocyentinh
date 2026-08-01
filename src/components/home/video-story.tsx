"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function VideoStory() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-emerald-950 shadow-2xl shadow-emerald-950/15">
      <Image
        src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=85"
        alt="Nhóm học sinh Trường THPT Minh Khai cùng tham gia hoạt động ngoài trời"
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className={`object-cover transition duration-700 ${playing ? "scale-105 opacity-55" : "opacity-80"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
            Phim giới thiệu · 03:24
          </p>
          <h3 className="mt-2 max-w-md font-serif text-2xl font-bold text-white sm:text-3xl">
            Một ngày hạnh phúc tại Minh Khai
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-amber-400 text-slate-950 shadow-xl transition hover:scale-105 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-16"
          aria-label={playing ? "Tạm dừng video giới thiệu" : "Phát video giới thiệu"}
        >
          {playing ? (
            <Pause className="size-6" aria-hidden="true" />
          ) : (
            <Play className="ml-1 size-6 fill-current" aria-hidden="true" />
          )}
        </button>
      </div>
      {playing && (
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-xs font-bold text-white backdrop-blur">
          <Volume2 className="size-4" aria-hidden="true" />
          Video mô phỏng đang phát
        </div>
      )}
    </div>
  );
}
