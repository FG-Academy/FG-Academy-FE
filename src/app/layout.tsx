import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/app/components/ReactQueryProvider";
import AuthSession from "@/app/components/AuthSession";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "꽃동산 아카데미",
  description: "꽃동산 아카데미 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </AuthSession>
        <Toaster />
      </body>
    </html>
  );
}
