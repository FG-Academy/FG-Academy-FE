import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import SideNav from "./components/SideNav";
import { Suspense } from "react";

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
    <Suspense>
      <div className="flex flex-row min-h-screen">
        <SideNav />
        {children}
      </div>
    </Suspense>
  );
}
