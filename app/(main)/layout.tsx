import type { Metadata } from "next";
import { MainLayout } from "@/2.Pages/Main/Ui";
import "../globals.css";

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
