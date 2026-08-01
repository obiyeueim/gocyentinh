import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
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
    <html lang="vi" className="h-full antialiased">
      <body className="flex min-h-full flex-col" style={fontVariables}>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
