import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResuStack - 가장 빠른 이력서 빌더",
  description: "입력은 블록으로, 완성은 AI로. 10분 만에 완성하는 취업용 이력서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
