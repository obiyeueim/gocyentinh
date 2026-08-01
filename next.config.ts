import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/goc-binh-yen",
        destination: "/goc-binh-yen.html",
      },
      {
        source: "/dang-nhap",
        destination: "/dang-nhap.html",
      },
      {
        source: "/quan-ly",
        destination: "/quan-ly.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/goc-binh-yen",
        permanent: false,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
