import { BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
      aria-label="Trường THPT Minh Khai - Trang chủ"
    >
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-950/10 transition-transform group-hover:-rotate-2">
        <GraduationCap className="size-6" aria-hidden="true" />
        <BookOpen
          className="absolute -bottom-2 -right-1 size-6 text-amber-300/30"
          aria-hidden="true"
        />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-800">
            Trường THPT
          </span>
          <span className="block truncate font-serif text-lg font-bold leading-tight text-slate-950">
            Minh Khai
          </span>
        </span>
      )}
    </Link>
  );
}
