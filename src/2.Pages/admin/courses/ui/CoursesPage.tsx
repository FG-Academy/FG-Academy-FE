"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { CourseDataTable, courseColumns } from "@/3.widgets/admin/course-table";
import { PageHeader } from "@/6.shared/ui/admin";

export function CoursesPage() {
  const { data: courses, isLoading } = useQuery(adminCourseQueries.all());

  if (isLoading || !courses) {
    return (
      <div className="p-8 w-full flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <PageHeader
        title="강의 관리"
        description="강의를 추가, 수정, 삭제할 수 있습니다."
        action={
          <Link href="/admin/courses/edit">
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              새 강의
            </Button>
          </Link>
        }
      />
      <div className="mt-6">
        <CourseDataTable columns={courseColumns} data={courses} />
      </div>
    </div>
  );
}
