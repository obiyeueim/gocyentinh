import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsExplorer } from "@/components/news-explorer";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tin tức & truyền thông",
  description:
    "Tin tức, thông báo, thành tích và thư viện ảnh video của Trường THPT Minh Khai.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tin tức & truyền thông"
        title="Mỗi ngày một câu chuyện đáng nhớ"
        description="Theo dõi hoạt động học tập, thành tích, thông báo và những khoảnh khắc sống động trong cộng đồng Minh Khai."
        image="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2000&q=85"
      />
      <Suspense fallback={<div className="site-container py-20 text-slate-500">Đang tải tin tức...</div>}>
        <NewsExplorer />
      </Suspense>
    </>
  );
}
