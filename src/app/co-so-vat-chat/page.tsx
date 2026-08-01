import { BusFront, CheckCircle2, Leaf, ShieldCheck, Wifi } from "lucide-react";
import type { Metadata } from "next";
import { FacilityExplorer } from "@/components/facilities/facility-explorer";
import { PageHero, SectionHeading } from "@/components/ui";
import { facilities } from "@/data";

export const metadata: Metadata = {
  title: "Cơ sở vật chất",
  description:
    "Khám phá thư viện, phòng học thông minh, phòng thí nghiệm và dịch vụ xe đưa đón của Trường THPT Minh Khai.",
};

const commitments = [
  {
    icon: ShieldCheck,
    title: "An toàn là ưu tiên",
    description: "Kiểm tra định kỳ, camera khu vực chung và quy trình ứng phó rõ ràng.",
  },
  {
    icon: Leaf,
    title: "Không gian xanh",
    description: "42% diện tích là sân vườn, bóng mát và khu hoạt động ngoài trời.",
  },
  {
    icon: Wifi,
    title: "Kết nối hiện đại",
    description: "Wifi 6 toàn trường và hệ thống học liệu số hỗ trợ học tập.",
  },
  {
    icon: BusFront,
    title: "Di chuyển thuận tiện",
    description: "12 tuyến xe với GPS và quy trình điểm danh điện tử.",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cơ sở vật chất"
        title="Không gian nuôi dưỡng trải nghiệm"
        description="Mỗi góc trường được thiết kế để khơi gợi tò mò, hỗ trợ kết nối và đảm bảo an toàn cho mọi học sinh."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Khám phá khuôn viên"
            title="Hiện đại, thân thiện và dễ tiếp cận"
            description="Chọn một danh mục để xem hình ảnh, tiện ích và thông tin tiếp cận của từng không gian."
          />
          <div className="mt-10">
            <FacilityExplorer facilities={facilities} />
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container">
          <SectionHeading
            eyebrow="Cam kết vận hành"
            title="Một môi trường để an tâm học tập"
            description="Cơ sở vật chất được chăm sóc bằng những tiêu chuẩn rõ ràng và cải tiến liên tục."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-emerald-100 px-6 py-7 sm:flex-row">
            <p className="flex items-center gap-3 font-bold text-emerald-950">
              <CheckCircle2 className="size-6 shrink-0 text-emerald-700" aria-hidden="true" />
              Khuôn viên có lối đi tiếp cận cho người sử dụng xe lăn.
            </p>
            <a href="tel:02838220088" className="button-primary shrink-0">
              Đặt lịch tham quan
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
