import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider, ReactQueryProviders } from "@/1.app/providers";
import "./globals.css";
import { Toaster } from "@/6.shared/ui";
import { auth } from "./auth";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/woff2/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "꽃동산 아카데미",
  description: "꽃동산 아카데미 사이트입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${pretendard.variable} font-sans`}>
        <ReactQueryProviders>
          <AuthProvider session={session}>{children}</AuthProvider>
        </ReactQueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
