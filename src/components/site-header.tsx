"use client";

import {
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Logo } from "./logo";

const navigation = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Tuyển sinh", href: "/tuyen-sinh" },
  { label: "Chương trình", href: "/chuong-trinh-dao-tao" },
  { label: "Lịch học", href: "/lich-hoc" },
  { label: "Cơ sở vật chất", href: "/co-so-vat-chat" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/tin-tuc?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-3 font-bold text-emerald-900 shadow-xl transition-transform focus:translate-y-0"
      >
        Chuyển đến nội dung chính
      </a>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <div className="hidden bg-emerald-950 text-white lg:block">
          <div className="site-container flex h-9 items-center justify-between text-xs">
            <p className="font-medium tracking-wide text-emerald-50/85">
              Học để trưởng thành · Sống để cống hiến
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:02838220088"
                className="inline-flex items-center gap-2 hover:text-amber-300"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                (028) 3822 0088
              </a>
              <Link href="/tuyen-sinh#tra-cuu" className="hover:text-amber-300">
                Tra cứu hồ sơ
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-amber-300"
                aria-label="Ngôn ngữ hiện tại: Tiếng Việt"
              >
                VI
                <ChevronDown className="size-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="site-container flex h-[76px] items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Điều hướng chính">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                    active
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-700"
              aria-label={searchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Search className="size-5" aria-hidden="true" />
              )}
            </button>
            <Link
              href="/tuyen-sinh#dang-ky"
              className="hidden h-11 items-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-extrabold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:inline-flex"
            >
              Đăng ký tuyển sinh
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-700 xl:hidden"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-slate-100 bg-white">
            <form
              onSubmit={handleSearch}
              className="site-container flex gap-2 py-4"
              role="search"
            >
              <label htmlFor="site-search" className="sr-only">
                Tìm kiếm trên website
              </label>
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInput}
                  id="site-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="input-control pl-12"
                  placeholder="Tìm bài viết, thông báo, sự kiện..."
                />
              </div>
              <button className="button-primary" type="submit">
                Tìm kiếm
              </button>
            </form>
          </div>
        )}

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 xl:hidden"
            aria-label="Điều hướng trên thiết bị di động"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {navigation.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-bold ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/tuyen-sinh#dang-ky"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-extrabold text-slate-950 sm:hidden"
              >
                Đăng ký tuyển sinh
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
