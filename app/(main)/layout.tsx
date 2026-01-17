import type { Metadata } from "next";
import "../globals.css";
import { MainLayout } from "@/2.pages/main";

export const metadata: Metadata = {
  title: "꽃동산 아카데미",
  description: "꽃동산 아카데미 사이트입니다.",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <MainLayout>{children}</MainLayout>;

export default Layout;
