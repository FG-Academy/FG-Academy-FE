"use client";

import { useQuery } from "@tanstack/react-query";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { CourseDataTable, courseColumns } from "@/3.widgets/admin/course-table";

export function CoursesPage() {
  const { data: courses, isLoading } = useQuery(adminCourseQueries.all());

  if (isLoading || !courses) {
    return (
      <div className="px-10 p-4 w-full max-h-screen flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="px-10 p-4 w-full max-h-screen">
      <div className="text-2xl mb-4">강의 관리</div>
      <div className="flex flex-col p-2 h-[646px]">
        <CourseDataTable columns={courseColumns} data={courses} />
      </div>
    </div>
  );
}
