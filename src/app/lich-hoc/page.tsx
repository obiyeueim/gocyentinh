import { BellRing, CalendarCheck, Download, Info } from "lucide-react";
import type { Metadata } from "next";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { PageHero, SectionHeading } from "@/components/ui";
import { schedules } from "@/data";

export const metadata: Metadata = {
  title: "Lịch học & sự kiện",
  description:
    "Lịch học, lịch thi, ngày nghỉ và sự kiện tại Trường THPT Minh Khai.",
};

export default function SchedulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lịch học & sự kiện"
        title="Chủ động trong từng ngày học"
        description="Theo dõi thời khóa biểu, lịch thi, ngày nghỉ và các hoạt động của nhà trường trong một nơi."
        image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Lịch tuần"
              title="Tìm đúng lịch, đúng thời điểm"
              description="Chọn ngày, loại lịch và lớp để xem thông tin phù hợp. Dữ liệu dưới đây dùng cho mục đích minh họa."
            />
            <button type="button" className="button-secondary w-fit">
              <Download className="size-4" aria-hidden="true" />
              Tải lịch tuần
            </button>
          </div>
          <div className="mt-10">
            <ScheduleCalendar items={schedules} />
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="site-container grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <CalendarCheck className="size-7 text-emerald-700" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-xl font-bold text-slate-950">
              Đồng bộ lịch cá nhân
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Component sẵn sàng kết nối Google Calendar hoặc tệp iCal trong giai
              đoạn tích hợp backend.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <BellRing className="size-7 text-amber-600" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-xl font-bold text-slate-950">
              Nhận thông báo thay đổi
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Đăng ký email hoặc thông báo ứng dụng để nhận lịch nghỉ và thay đổi
              thời khóa biểu.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <Info className="size-7 text-blue-600" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-xl font-bold text-slate-950">
              Lưu ý lịch chính thức
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Thông báo từ Phòng Học vụ và giáo viên chủ nhiệm luôn là nguồn cập
              nhật chính thức.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
