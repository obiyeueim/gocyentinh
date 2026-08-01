import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={
          theme === "dark"
            ? "text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300"
            : "eyebrow"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-balance font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
          theme === "dark" ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-pretty text-base leading-7 ${
            theme === "dark" ? "text-emerald-50/70" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#022c22_0%,rgba(2,44,34,.88)_48%,rgba(2,44,34,.4)_100%)]" />
      <div className="absolute -right-24 -top-36 size-96 rounded-full border border-white/10" />
      <div className="absolute -right-10 -top-16 size-64 rounded-full border border-amber-300/20" />
      <div className="site-container relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-2 text-xs font-bold text-emerald-100/75">
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page">{eyebrow}</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-emerald-50/80 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 transition hover:gap-3 hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <p className="font-bold text-slate-800">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
