"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import { useSelectedCourseStore } from "@/4.features/admin/manage-quiz";
import {
  LectureQuizDataTable,
  lectureQuizColumns,
  courseForQuizColumns,
} from "@/3.widgets/admin/quiz-register";
import { CourseDataTable } from "@/3.widgets/admin/course-table";
import { PageHeader } from "@/6.shared/ui/admin";

export function QuizRegisterPage() {
  const { selectedCourseId, setSelectedCourseId } = useSelectedCourseStore();

  const { data: courses, isLoading: isLoadingCourses } = useQuery(
    adminCourseQueries.all()
  );

  const { data: lectures, isLoading: isLoadingLectures } = useQuery(
    adminQuizQueries.courseLectures(selectedCourseId)
  );

  if (isLoadingCourses || !courses) {
    return (
      <div className="p-8 w-full flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const selectedCourse = courses.find(
    (course) => course.courseId === selectedCourseId
  );

  return (
    <div className="p-8 w-full">
      {selectedCourseId && selectedCourse ? (
        <>
          <PageHeader
            title={selectedCourse.title}
            description="강의별 퀴즈를 등록하고 관리할 수 있습니다."
            action={
              <Button
                onClick={() => setSelectedCourseId(null)}
                className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                코스 목록
              </Button>
            }
          />
          <div className="mt-6">
            {isLoadingLectures ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : lectures ? (
              <LectureQuizDataTable columns={lectureQuizColumns} data={lectures} />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <PageHeader
            title="퀴즈 등록"
            description="퀴즈를 등록할 코스를 선택하세요."
          />
          <div className="mt-6">
            <CourseDataTable columns={courseForQuizColumns} data={courses} />
          </div>
        </>
      )}
    </div>
  );
}
