"use client";

import { DataTable } from "./components/DataTable";
import { useSession } from "next-auth/react";
import { useFetchAllAdminCourseListQuery } from "@/hooks/useCourseQuery";
import { videoColumns } from "./components/columns";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: courses } = useFetchAllAdminCourseListQuery(accessToken);

  if (!courses) {
    return <Loading />;
  }

  return (
    <div className="px-10 p-4 w-full min-h-screen">
      <div className="text-2xl mb-4">강의 관리</div>
      <div className="flex flex-col p-2 h-[646px]">
        <DataTable columns={videoColumns} data={courses} />
      </div>
    </div>
  );
}
