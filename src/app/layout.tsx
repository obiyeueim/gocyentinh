import type { Metadata } from "next";
import Script from "next/script";
import type { CSSProperties } from "react";
import "./globals.css";
import "../../public/motion/gaming-motion.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://thpt-minh-khai-2026.niceeeeeaaxxx.chatgpt.site",
  ),
  title: {
    default: "Trường THPT Minh Khai",
    template: "%s | THPT Minh Khai",
  },
  description:
    "Trường THPT Minh Khai – môi trường giáo dục hạnh phúc, hiện đại và khai phóng.",
  keywords: [
    "THPT Minh Khai",
    "trường trung học phổ thông",
    "tuyển sinh lớp 10",
    "giáo dục STEM",
  ],
  openGraph: {
    title: "Trường THPT Minh Khai",
    description:
      "Khai mở tiềm năng, nuôi dưỡng bản lĩnh và trách nhiệm cộng đồng.",
    locale: "vi_VN",
    type: "website",
  },
};

const fontVariables = {
  "--font-body": '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
  "--font-display":
    '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased gaming-motion">
      <body className="flex min-h-full flex-col" style={fontVariables}>
        <div
          id="gmPageTransition"
          className="gm-page-transition"
          aria-hidden="true"
        >
          <div className="gm-transition-grid" aria-hidden="true" />
          <div className="gm-transition-core" aria-hidden="true" />
        </div>
        <noscript>
          <style>{".gm-page-transition{display:none!important}"}</style>
        </noscript>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
        <Script src="/motion/gaming-motion.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
