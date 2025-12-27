"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { CourseEditForm } from "@/4.features/admin/manage-course";

export function CourseEditPage() {
  const searchParams = useSearchParams();
  const courseId = parseInt(searchParams.get("cid") as string);

  const { data: courseInfo, isLoading } = useQuery(
    adminCourseQueries.byId(courseId)
  );

  if (isLoading || !courseInfo) {
    return (
      <div className="w-full h-screen p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-4 overflow-hidden">
      <CourseEditForm courseInfo={courseInfo} />
    </div>
  );
}
