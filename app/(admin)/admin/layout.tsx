import type { Metadata } from "next";
import "../../globals.css";
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
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </Suspense>
  );
}
