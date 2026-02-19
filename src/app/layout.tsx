import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipArena - AI 영상 생성 플랫폼",
  description: "텍스트 프롬프트로 고품질 AI 영상을 몇 초 만에 생성하세요. 프롬프트가 어렵다면 템플릿으로 바로 시작.",
  keywords: ["AI 영상", "영상 생성", "AI 비디오", "프롬프트 영상", "템플릿 영상", "바이럴 영상"],
  metadataBase: new URL("https://cliparena.pages.dev"),
  openGraph: {
    title: "ClipArena - AI 영상 생성 플랫폼",
    description: "텍스트 프롬프트로 고품질 AI 영상을 몇 초 만에 생성하세요.",
    siteName: "ClipArena",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipArena - AI 영상 생성 플랫폼",
    description: "텍스트 프롬프트로 고품질 AI 영상을 몇 초 만에 생성하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-background focus:outline-none"
        >
          본문으로 건너뛰기
        </a>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
