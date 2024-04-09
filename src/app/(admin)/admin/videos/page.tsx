"use client";

import CourseCard from "@/app/(home)/course/[courseId]/components/course-card";
import { DataTable } from "./components/DataTable";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  return (
    <div className="bg-red-50 flex flex-col p-4 w-full min-h-screen">
      <div className="text-2xl mb-4">강의 관리</div>
      <div className="bg-blue-100 flex flex-col h-full">
        {/* <DataTable />
         */}
      </div>
    </div>
  );
}
