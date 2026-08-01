import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://thpt-minh-khai-2026.niceeeeeaaxxx.chatgpt.site/sitemap.xml",
  };
}
