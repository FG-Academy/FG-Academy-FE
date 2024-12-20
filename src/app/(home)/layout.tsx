import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/app/(home)/_components/Header";
import Footer from "@/app/(home)/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "꽃동산 아카데미",
  description: "꽃동산 아카데미 사이트입니다.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen">
        <Header />
        <main className="flex-auto overflow-y-auto">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
