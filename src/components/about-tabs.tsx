"use client";

import { Compass, Eye, Gem, History, Sparkles } from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    id: "history",
    label: "Lịch sử",
    icon: History,
    title: "Hơn sáu thập kỷ kiến tạo giá trị",
    content:
      "Được thành lập năm 1962, Trường THPT Minh Khai đã trải qua nhiều giai đoạn phát triển, từ một ngôi trường nhỏ của thành phố trở thành cộng đồng giáo dục tiên phong, giàu truyền thống và luôn sẵn sàng đổi mới.",
    points: [
      "1962 — Thành lập với 08 lớp học đầu tiên",
      "2008 — Đạt chuẩn quốc gia giai đoạn I",
      "2018 — Khánh thành khối STEM và thư viện mở",
      "2025 — Công nhận trường học hạnh phúc cấp thành phố",
    ],
  },
  {
    id: "mission",
    label: "Sứ mệnh",
    icon: Compass,
    title: "Khai mở tiềm năng của mỗi học sinh",
    content:
      "Kiến tạo môi trường học tập an toàn và nhân văn, nơi học sinh được trang bị nền tảng tri thức, năng lực tự học, bản lĩnh lựa chọn và tinh thần trách nhiệm để sống một cuộc đời có ý nghĩa.",
    points: [
      "Cá nhân hóa hành trình học tập",
      "Kết nối tri thức với đời sống",
      "Nuôi dưỡng sức khỏe thể chất và tinh thần",
      "Lan tỏa trách nhiệm cộng đồng",
    ],
  },
  {
    id: "vision",
    label: "Tầm nhìn",
    icon: Eye,
    title: "Trường học khai phóng hàng đầu",
    content:
      "Đến năm 2030, Minh Khai hướng tới trở thành một trong những trường THPT tiêu biểu về giáo dục khai phóng và chuyển đổi số, có môi trường học tập hạnh phúc và mạng lưới hợp tác quốc tế bền vững.",
    points: [
      "Tiên phong đổi mới phương pháp giáo dục",
      "Mỗi học sinh có một hồ sơ năng lực số",
      "Kết nối trường đại học và doanh nghiệp",
      "Vận hành trường học xanh, bền vững",
    ],
  },
  {
    id: "values",
    label: "Giá trị cốt lõi",
    icon: Gem,
    title: "Tôn trọng · Chính trực · Khai phóng · Cống hiến",
    content:
      "Bốn giá trị là kim chỉ nam cho mọi quyết định và hành động tại Minh Khai, từ cách dạy và học đến cách mỗi thành viên đối thoại, hợp tác và đóng góp cho cộng đồng.",
    points: [
      "Tôn trọng sự khác biệt",
      "Chính trực trong học tập và cuộc sống",
      "Khai phóng tư duy, dũng cảm khám phá",
      "Cống hiến bằng năng lực và lòng nhân ái",
    ],
  },
] as const;

export function AboutTabs() {
  const [activeId, setActiveId] = useState<(typeof tabs)[number]["id"]>("history");
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const ActiveIcon = active.icon;

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-3"
        role="tablist"
        aria-label="Thông tin định hướng của nhà trường"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = activeId === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                selected
                  ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/15"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="mt-5 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative overflow-hidden bg-emerald-950 p-8 text-white sm:p-12">
          <div className="absolute -bottom-24 -right-20 size-72 rounded-full border-[36px] border-white/5" />
          <span className="grid size-14 place-items-center rounded-2xl bg-amber-300 text-emerald-950">
            <ActiveIcon className="size-7" aria-hidden="true" />
          </span>
          <h3 className="relative mt-8 text-balance font-serif text-3xl font-bold sm:text-4xl">
            {active.title}
          </h3>
          <p className="relative mt-5 leading-8 text-emerald-50/75">{active.content}</p>
        </div>
        <div className="p-8 sm:p-12">
          <p className="eyebrow">Những dấu mốc nổi bật</p>
          <ul className="mt-7 space-y-5">
            {active.points.map((point) => (
              <li key={point} className="flex gap-3">
                <Sparkles
                  className="mt-0.5 size-5 shrink-0 text-amber-500"
                  aria-hidden="true"
                />
                <span className="font-bold leading-6 text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
