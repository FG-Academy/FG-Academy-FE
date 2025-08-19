"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "@/6.shared/ui";
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
    <div className="flex flex-col w-full">
      <CourseHeader course={course} />

      <main className="flex flex-col items-start bg-gray-100 gap-6 px-8 py-6 min-w-[368px] md:flex-row">
        <div className="flex flex-col items-center w-full gap-4">
          <CourseInfoTabs description={course.description} />

          <section className="flex flex-col w-full gap-4 p-6 bg-white rounded-lg">
            <div className="flex justify-between">
              <Typography name="large">강의 커리큘럼</Typography>
              <Typography name="small" className="text-gray-500">
                {lectures.length}개 강의
              </Typography>
            </div>
            <LectureList
              completedCount={enrollment.completedLectures}
              lectures={lectures}
              isTaking={enrollment.isTaking}
              lastStudyLectureId={enrollment.lastStudyLecture}
              courseCurriculum={course.curriculum}
            />
          </section>
        </div>
        <aside className="sticky self-start top-24 z-20 min-w-[368px] h-fit rounded-lg bg-white">
          <EnrollmentProgress enrollment={enrollment}>
            <EnrollButton
              enrollment={enrollment}
              firstLectureId={
                lectures.length > 0 ? lectures[0].lectureId : null
              }
            />
          </EnrollmentProgress>
        </aside>
      </main>
    </div>
  );
}
