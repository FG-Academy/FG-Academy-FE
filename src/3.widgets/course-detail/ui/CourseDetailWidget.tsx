"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { CourseInfoTabs } from "@/5.entities/course/ui/CourseInfoTabs";
import { CourseHeader, courseQueries } from "@/5.entities/course";
import { LectureList, lectureQueries } from "@/5.entities/lecture";
import { EnrollmentProgress, enrollmentQueries } from "@/5.entities/enrollment";
import { EnrollButton } from "@/4.features/enroll-course";

type Props = { courseId: number };

export function CourseDetailWidget({ courseId }: Props) {
  const { data: course } = useSuspenseQuery(courseQueries.detail(courseId));
  const { data: lectures } = useSuspenseQuery(
    lectureQueries.byCourse(courseId)
  );
  const { data: enrollment } = useSuspenseQuery(
    enrollmentQueries.byCourse(courseId)
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <CourseHeader course={course} />

      <main className="flex flex-col-reverse gap-6 px-4 md:px-8 py-8 md:flex-row md:items-start max-w-[1400px] mx-auto w-full">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-col w-full gap-6 min-w-0 md:flex-1">
          <CourseInfoTabs description={course.description} />

          {/* 강의 커리큘럼 섹션 */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-blue shrink-0" />
                <h2 className="text-base md:text-lg font-bold text-gray-900">
                  강의 커리큘럼
                </h2>
              </div>
              <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-2 md:px-3 py-1 rounded-full shrink-0">
                {lectures.length}개
              </span>
            </div>
            <div className="p-3 md:p-6">
              <LectureList
                completedCount={enrollment.completedLectures}
                lectures={lectures}
                isTaking={enrollment.isTaking}
                lastStudyLectureId={enrollment.lastStudyLecture}
                courseCurriculum={course.curriculum}
              />
            </div>
          </section>
        </div>

        {/* 사이드바 - 수강 현황 */}
        <aside className="w-full md:w-auto md:min-w-[340px] md:max-w-[380px] md:sticky md:top-24 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <EnrollmentProgress enrollment={enrollment}>
              <EnrollButton
                enrollment={enrollment}
                firstLectureId={
                  lectures.length > 0 ? lectures[0].lectureId : null
                }
              />
            </EnrollmentProgress>
          </div>
        </aside>
      </main>
    </div>
  );
}
