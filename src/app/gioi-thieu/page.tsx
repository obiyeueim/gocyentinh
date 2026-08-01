import {
  Award,
  BookOpenCheck,
  Globe2,
  Mail,
  Medal,
  Trophy,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AboutTabs } from "@/components/about-tabs";
import { PageHero, SectionHeading } from "@/components/ui";
import { faculty } from "@/data";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Lịch sử, sứ mệnh, đội ngũ lãnh đạo và những thành tựu của Trường THPT Minh Khai.",
};

const achievements = [
  {
    icon: Trophy,
    value: "12 năm",
    title: "Tập thể lao động xuất sắc",
    note: "Liên tục từ 2014 đến 2026",
  },
  {
    icon: Medal,
    value: "98,6%",
    title: "Tốt nghiệp THPT",
    note: "Tỷ lệ trung bình 5 năm",
  },
  {
    icon: Award,
    value: "148+",
    title: "Giải học sinh giỏi",
    note: "Cấp thành phố và quốc gia",
  },
  {
    icon: BookOpenCheck,
    value: "87%",
    title: "Trúng tuyển đại học",
    note: "Theo nguyện vọng ưu tiên",
  },
];

const partners = [
  "ĐHQG TP.HCM",
  "British Council",
  "FPT Education",
  "ĐH Fulbright",
  "VietSeeds",
  "STEM Alliance",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Giới thiệu"
        title="Một ngôi trường, nhiều thế hệ trưởng thành"
        description="Từ truyền thống hơn 60 năm, Minh Khai không ngừng đổi mới để mỗi học sinh được học tập hạnh phúc, tự tin và có trách nhiệm."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Câu chuyện Minh Khai"
            title="Truyền thống là điểm tựa, đổi mới là hành trình"
            description="Những giá trị bền vững giúp nhà trường giữ vững bản sắc trong một thế giới không ngừng thay đổi."
          />
          <div className="mt-10">
            <AboutTabs />
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container">
          <SectionHeading
            eyebrow="Đội ngũ"
            title="Những người đồng hành tận tâm"
            description="Ban Giám hiệu và đội ngũ chuyên môn cùng kiến tạo một môi trường học tập tôn trọng, chuyên nghiệp và giàu cảm hứng."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((person) => (
              <article
                key={person.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={person.image}
                    alt={`Chân dung ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                    {person.department}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-bold text-slate-950">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">{person.role}</p>
                  <a
                    href={`mailto:${person.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-800"
                  >
                    <Mail className="size-3.5" aria-hidden="true" />
                    {person.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Thành tựu"
              title="Những con số của nỗ lực bền bỉ"
              description="Kết quả không chỉ nằm ở thành tích, mà còn ở sự trưởng thành của mỗi học sinh."
            />
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Users className="size-5" aria-hidden="true" />
              12.000+ cựu học sinh
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="size-7 text-amber-500" aria-hidden="true" />
                  <p className="mt-7 font-serif text-3xl font-bold text-emerald-900">
                    {item.value}
                  </p>
                  <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.note}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-emerald-950 text-white">
        <div className="site-container">
          <div className="flex items-start gap-4">
            <Globe2 className="mt-1 size-9 shrink-0 text-amber-300" aria-hidden="true" />
            <SectionHeading
              eyebrow="Đối tác chiến lược"
              title="Cùng mở rộng không gian học tập"
              description="Mạng lưới trường đại học, tổ chức giáo dục và doanh nghiệp đồng hành cùng học sinh trong học tập, hướng nghiệp và hoạt động cộng đồng."
              theme="dark"
            />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="grid min-h-32 place-items-center bg-emerald-950 px-4 text-center"
              >
                <span className="font-serif text-lg font-bold text-emerald-50/80">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
