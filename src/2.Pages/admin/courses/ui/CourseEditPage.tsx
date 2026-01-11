"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { CourseEditForm } from "@/4.features/admin/manage-course";
import { Button } from "@/6.shared/ui/shadcn/ui/button";

export function CourseEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = parseInt(searchParams.get("cid") as string);

  const { data: courseInfo, isLoading } = useQuery(
    adminCourseQueries.byId(courseId)
  );

  if (isLoading || !courseInfo) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">코스 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">코스 편집</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                코스 정보와 강의 목록을 수정할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <CourseEditForm courseInfo={courseInfo} />
      </div>
    </div>
  );
}
