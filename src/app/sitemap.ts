import type { MetadataRoute } from "next";
import { newsItems } from "@/data";

const baseUrl = "https://thpt-minh-khai-2026.niceeeeeaaxxx.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/gioi-thieu",
    "/tin-tuc",
    "/tuyen-sinh",
    "/chuong-trinh-dao-tao",
    "/lich-hoc",
    "/co-so-vat-chat",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const articles = newsItems.map((item) => ({
    url: `${baseUrl}/tin-tuc/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
