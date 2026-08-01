import {
  ArrowUpRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = [
  { label: "Giới thiệu nhà trường", href: "/gioi-thieu" },
  { label: "Tin tức & sự kiện", href: "/tin-tuc" },
  { label: "Chương trình đào tạo", href: "/chuong-trinh-dao-tao" },
  { label: "Lịch học & lịch thi", href: "/lich-hoc" },
  { label: "Cơ sở vật chất", href: "/co-so-vat-chat" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-emerald-950 text-white">
      <div className="site-container grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_0.9fr]">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3">
            <Logo />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100/75">
            Môi trường giáo dục hạnh phúc, nơi mỗi học sinh được khai mở tiềm
            năng, trưởng thành trong tri thức và lòng nhân ái.
          </p>
          <div className="mt-5 flex gap-2" aria-label="Mạng xã hội">
            {[MessageCircle, Video, Camera].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label={["Facebook", "YouTube", "Instagram"][index]}
                className="grid size-10 place-items-center rounded-lg border border-white/15 text-emerald-50 transition hover:border-amber-300 hover:bg-amber-300 hover:text-slate-950"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
            Khám phá
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-emerald-50/75">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
            Liên hệ
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-emerald-50/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
              125 Nguyễn Thị Minh Khai, Quận 3, TP. Hồ Chí Minh
            </li>
            <li>
              <a href="tel:02838220088" className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
                (028) 3822 0088
              </a>
            </li>
            <li>
              <a
                href="mailto:info@minhkhai.edu.vn"
                className="flex gap-3 hover:text-white"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
                info@minhkhai.edu.vn
              </a>
            </li>
            <li className="flex gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
              Thứ 2 – Thứ 6: 07:00 – 17:00
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
            Bản tin Minh Khai
          </h2>
          <p className="mt-5 text-sm leading-6 text-emerald-50/75">
            Nhận thông báo và những câu chuyện mới nhất từ nhà trường.
          </p>
          <form className="mt-4 space-y-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email nhận bản tin
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email của bạn"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-emerald-100/50 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
            />
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-amber-400 text-sm font-extrabold text-slate-950 hover:bg-amber-300"
            >
              Đăng ký nhận tin
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-3 py-5 text-xs text-emerald-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Trường THPT Minh Khai. Dữ liệu minh họa.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-white">
              Sơ đồ website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
