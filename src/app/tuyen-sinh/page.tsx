import {
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  FileText,
  PhoneCall,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import { ApplicationForm } from "@/components/admissions/application-form";
import { StatusTracker } from "@/components/admissions/status-tracker";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tuyển sinh",
  description:
    "Thông tin tuyển sinh, học phí, hồ sơ và cổng đăng ký trực tuyến Trường THPT Minh Khai.",
};

const admissionCards = [
  {
    icon: Target,
    title: "Chỉ tiêu",
    value: "600 học sinh",
    description: "15 lớp 10, gồm các định hướng STEM, Ngoại ngữ và KHXH.",
  },
  {
    icon: BadgeCheck,
    title: "Điều kiện",
    value: "Tốt nghiệp THCS",
    description: "Hạnh kiểm Khá trở lên và đáp ứng phương thức xét tuyển.",
  },
  {
    icon: FileText,
    title: "Hồ sơ",
    value: "04 nhóm giấy tờ",
    description: "Phiếu đăng ký, học bạ, giấy khai sinh và ảnh chân dung.",
  },
  {
    icon: CalendarCheck2,
    title: "Thời gian",
    value: "01/06 – 15/08",
    description: "Nộp trực tuyến 24/7 hoặc trực tiếp trong giờ hành chính.",
  },
];

const tuitionRows = [
  ["Học phí chương trình chuẩn", "2.400.000 đ", "Theo tháng"],
  ["Chương trình tăng cường tiếng Anh", "850.000 đ", "Theo tháng"],
  ["Phí cơ sở vật chất", "1.500.000 đ", "Theo năm"],
  ["Xe đưa đón", "900.000 – 1.600.000 đ", "Theo tuyến/tháng"],
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tuyển sinh"
        title="Cùng con chọn một hành trình phù hợp"
        description="Thông tin rõ ràng, thủ tục thuận tiện và đội ngũ tư vấn luôn sẵn sàng đồng hành cùng gia đình."
        image="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Tuyển sinh lớp 10 · 2026–2027"
            title="Thông tin cần biết"
            description="Những mốc chính giúp gia đình chủ động chuẩn bị hồ sơ và lựa chọn chương trình."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {admissionCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    {item.title}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-bold text-slate-950">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-emerald-950 p-7 text-white sm:p-9">
              <ClipboardList className="size-8 text-amber-300" aria-hidden="true" />
              <h3 className="mt-6 font-serif text-2xl font-bold">Bộ hồ sơ cần chuẩn bị</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Phiếu đăng ký tuyển sinh theo mẫu",
                  "Bản sao học bạ THCS có xác nhận",
                  "Bản sao giấy khai sinh và CCCD (nếu có)",
                  "02 ảnh chân dung 3×4 trong 06 tháng gần nhất",
                  "Chứng nhận ưu tiên hoặc thành tích (nếu có)",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-amber-300"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
                <Banknote className="size-6 text-emerald-700" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-950">
                    Học phí tham khảo
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">Năm học 2026–2027</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="sr-only">Bảng học phí tham khảo năm học 2026–2027</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-extrabold">
                        Khoản phí
                      </th>
                      <th scope="col" className="px-6 py-3 font-extrabold">
                        Mức phí
                      </th>
                      <th scope="col" className="px-6 py-3 font-extrabold">
                        Chu kỳ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tuitionRows.map((row) => (
                      <tr key={row[0]}>
                        <th scope="row" className="px-6 py-4 font-bold text-slate-800">
                          {row[0]}
                        </th>
                        <td className="px-6 py-4 font-extrabold text-emerald-800">
                          {row[1]}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-slate-100 px-6 py-4 text-xs leading-5 text-slate-500">
                * Mức phí là dữ liệu minh họa và có thể điều chỉnh theo chính sách
                chính thức.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dang-ky" className="section-space bg-slate-50">
        <div className="site-container grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
          <div>
            <SectionHeading
              eyebrow="Đăng ký trực tuyến"
              title="Bắt đầu hồ sơ trong vài phút"
              description="Điền thông tin theo ba bước. Bạn có thể chuẩn bị bản scan hoặc ảnh chụp rõ nét của giấy tờ trước khi bắt đầu."
            />
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-bold text-amber-950">Cần được hỗ trợ?</p>
              <p className="mt-2 text-sm leading-6 text-amber-900/70">
                Đội ngũ tuyển sinh trực từ 07:30–17:00, thứ Hai đến thứ Bảy.
              </p>
              <a
                href="tel:02838220088"
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-amber-950"
              >
                <PhoneCall className="size-4" aria-hidden="true" />
                (028) 3822 0088
              </a>
            </div>
          </div>
          <ApplicationForm />
        </div>
      </section>

      <section id="tra-cuu" className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Theo dõi trực tuyến"
            title="Tra cứu trạng thái hồ sơ"
            description="Kết quả minh bạch theo từng giai đoạn để gia đình chủ động hoàn tất thủ tục."
            align="center"
          />
          <div className="mt-10">
            <StatusTracker />
          </div>
        </div>
      </section>
    </>
  );
}
