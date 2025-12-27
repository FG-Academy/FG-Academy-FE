import type { Metadata } from "next";
import "@/app/globals.css";
import { AdminSidebar } from "@/3.widgets/admin/admin-sidebar";
import { Suspense } from "react";

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
        <AdminSidebar />
        {children}
      </div>
    </Suspense>
  );
}
