"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import { useSelectedCourseStore } from "@/4.features/admin/manage-quiz";
import {
  LectureQuizDataTable,
  lectureQuizColumns,
  courseForQuizColumns,
} from "@/3.widgets/admin/quiz-register";
import { CourseDataTable } from "@/3.widgets/admin/course-table";

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const selectedCourse = courses.find(
    (course) => course.courseId === selectedCourseId
  );

  return (
    <main className="flex flex-col w-full items-start p-8 space-y-4">
      {/* Header */}
      <div className="flex flex-row w-full items-start p-2 border-b-2 border-gray-300">
        <h2 className="text-2xl font-sans">퀴즈 등록 화면</h2>
      </div>

      {/* Course Title & Back Button */}
      {selectedCourseId && selectedCourse && (
        <div className="flex flex-row w-full justify-between p-2">
          <div className="font-bold text-2xl">{selectedCourse.title}</div>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setSelectedCourseId(null)}
          >
            코스 선택 화면
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col w-full h-[540px] p-2">
        {selectedCourseId ? (
          isLoadingLectures ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : lectures ? (
            <LectureQuizDataTable columns={lectureQuizColumns} data={lectures} />
          ) : null
        ) : (
          <CourseDataTable columns={courseForQuizColumns} data={courses} />
        )}
      </div>
    </main>
  );
}
