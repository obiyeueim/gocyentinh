import {
  BookMarked,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  GraduationCap,
  Languages,
  Microscope,
  Palette,
  Sigma,
} from "lucide-react";
import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chương trình đào tạo",
  description:
    "Chương trình THPT, môn học cốt lõi, môn tự chọn, thời khóa biểu mẫu và học liệu tại Trường THPT Minh Khai.",
};

const objectives = [
  {
    icon: BrainCircuit,
    title: "Tư duy độc lập",
    description: "Biết đặt câu hỏi, phân tích bằng chứng và đưa ra lựa chọn có cơ sở.",
  },
  {
    icon: Languages,
    title: "Năng lực toàn cầu",
    description: "Sử dụng ngoại ngữ tự tin và thấu hiểu sự đa dạng văn hóa.",
  },
  {
    icon: Compass,
    title: "Tự chủ hướng nghiệp",
    description: "Hiểu bản thân, khám phá nghề nghiệp và xây dựng lộ trình tương lai.",
  },
  {
    icon: GraduationCap,
    title: "Học tập suốt đời",
    description: "Có phương pháp tự học, khả năng thích nghi và niềm vui khám phá.",
  },
];

const subjects = {
  core: [
    { name: "Ngữ văn", hours: 3, color: "bg-rose-100 text-rose-800" },
    { name: "Toán", hours: 4, color: "bg-blue-100 text-blue-800" },
    { name: "Ngoại ngữ 1", hours: 3, color: "bg-violet-100 text-violet-800" },
    { name: "Giáo dục thể chất", hours: 2, color: "bg-lime-100 text-lime-800" },
    { name: "Giáo dục quốc phòng", hours: 1, color: "bg-amber-100 text-amber-800" },
    { name: "Hoạt động trải nghiệm", hours: 3, color: "bg-emerald-100 text-emerald-800" },
  ],
  electives: [
    { name: "Vật lý", group: "Khoa học tự nhiên", icon: Sigma },
    { name: "Hóa học", group: "Khoa học tự nhiên", icon: Microscope },
    { name: "Sinh học", group: "Khoa học tự nhiên", icon: Microscope },
    { name: "Địa lý", group: "Khoa học xã hội", icon: Compass },
    { name: "Giáo dục kinh tế & pháp luật", group: "Khoa học xã hội", icon: BookMarked },
    { name: "Mỹ thuật", group: "Nghệ thuật", icon: Palette },
  ],
};

const sampleSchedule = [
  ["07:00", "Toán", "Ngữ văn", "Tiếng Anh", "Vật lý", "Toán"],
  ["08:00", "Toán", "Ngữ văn", "Tiếng Anh", "Vật lý", "Hóa học"],
  ["09:00", "Sinh học", "Tin học", "Toán", "Lịch sử", "Hóa học"],
  ["10:00", "Sinh học", "Tin học", "Toán", "Lịch sử", "Hướng nghiệp"],
  ["14:00", "Thể chất", "CLB tự chọn", "Dự án STEM", "Tiếng Anh+", "Sinh hoạt lớp"],
];

const textbooks = [
  "Kết nối tri thức với cuộc sống",
  "Chân trời sáng tạo",
  "Cánh Diều",
  "Oxford Discover Futures",
];

export default function AcademicProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="Chương trình đào tạo"
        title="Học vững vàng, hiểu sâu sắc, sống có định hướng"
        description="Chương trình THPT quốc gia được làm giàu bằng trải nghiệm STEM, ngoại ngữ, nghệ thuật và hướng nghiệp cá nhân hóa."
        image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Mục tiêu đầu ra"
            title="Năng lực cho một thế giới đang thay đổi"
            description="Minh Khai hướng tới sự phát triển cân bằng giữa tri thức, kỹ năng, sức khỏe tinh thần và trách nhiệm xã hội."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="size-7 text-emerald-700" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container">
          <SectionHeading
            eyebrow="Cấu trúc chương trình"
            title="Nền tảng cốt lõi và lựa chọn linh hoạt"
            description="Học sinh học đầy đủ các môn bắt buộc và chọn tổ hợp phù hợp với năng lực, sở thích, định hướng nghề nghiệp."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Môn học bắt buộc
              </p>
              <div className="mt-6 space-y-3">
                {subjects.core.map((subject) => (
                  <div
                    key={subject.name}
                    className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"
                  >
                    <span className="font-bold text-slate-800">{subject.name}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${subject.color}`}>
                      {subject.hours} tiết/tuần
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Môn học lựa chọn
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {subjects.electives.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <article key={subject.name} className="rounded-xl border border-slate-200 p-4">
                      <Icon className="size-5 text-amber-600" aria-hidden="true" />
                      <h3 className="mt-4 font-bold text-slate-800">{subject.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">{subject.group}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                Học sinh chọn 04 trong 09 môn lựa chọn theo tổ hợp định hướng.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Một tuần điển hình"
              title="Thời khóa biểu mẫu khối 10"
              description="Lịch học cân bằng giữa môn nền tảng, học qua dự án, vận động và hoạt động tự chọn."
            />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-xs font-extrabold text-emerald-800">
              <Clock3 className="size-4" aria-hidden="true" />
              29 tiết chính khóa/tuần
            </span>
          </div>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Thời khóa biểu mẫu khối 10</caption>
              <thead className="bg-emerald-950 text-white">
                <tr>
                  {["Giờ", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"].map(
                    (heading) => (
                      <th key={heading} scope="col" className="px-5 py-4 font-extrabold">
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sampleSchedule.map((row) => (
                  <tr key={row[0]} className="hover:bg-emerald-50/50">
                    <th scope="row" className="px-5 py-4 font-extrabold text-emerald-800">
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className="px-5 py-4 font-medium text-slate-600">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-space bg-emerald-950 text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
              Học liệu
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Sách giáo khoa và tài nguyên số
            </h2>
            <p className="mt-4 leading-7 text-emerald-50/70">
              Nhà trường lựa chọn sách theo từng môn, kết hợp học liệu số và thư viện
              điện tử để hỗ trợ nhiều phong cách học tập.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {textbooks.map((book) => (
              <div
                key={book}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5"
              >
                <BookMarked className="size-5 shrink-0 text-amber-300" aria-hidden="true" />
                <span className="font-bold text-emerald-50">{book}</span>
              </div>
            ))}
            <div className="sm:col-span-2 flex items-start gap-3 rounded-2xl bg-amber-300 p-5 text-slate-950">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-bold leading-6">
                Danh mục sách cụ thể được công bố trước mỗi năm học và tuân thủ hướng
                dẫn của Bộ Giáo dục & Đào tạo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
