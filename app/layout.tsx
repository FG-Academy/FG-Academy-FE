import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider, ReactQueryProviders } from "@/1.app/providers";
import "./globals.css";
import { Toaster } from "@/6.shared/ui";

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
        <ReactQueryProviders>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
