"use client";

import { defaultTo } from "es-toolkit/compat";
import { cn, getImageUrl } from "@/6.shared/lib";
import { AspectRatio, ImageWithFallback, Progress } from "@/6.shared/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { courseQueries } from "../api/course.queries";
import { CourseDetail } from "../model/course.type";
import { Play, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const MyCourseList = () => {
  const [isStudying, setIsStudying] = useState(true);

  const { data: myCourses } = useSuspenseQuery(courseQueries.myCourses());

  const studyingCourses = myCourses.courseDetail.filter(
    (course) => course.totalCourseLength !== course.completedLectures
  );
  const completedCourses = myCourses.courseDetail.filter(
    (course) =>
      course.totalCourseLength !== 0 &&
      course.totalCourseLength === course.completedLectures
  );

  const filteredCourses = isStudying ? studyingCourses : completedCourses;

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 헤더 */}
      <header className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary-blue rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            내 강의
          </h2>
        </div>

        {/* 탭 버튼 */}
        <div className="flex gap-2">
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              isStudying
                ? "bg-primary-blue text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setIsStudying(true)}
          >
            <BookOpen className="w-4 h-4" />
            수강 중
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                isStudying ? "bg-white/20" : "bg-gray-200"
              )}
            >
              {studyingCourses.length}
            </span>
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              !isStudying
                ? "bg-primary-blue text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setIsStudying(false)}
          >
            <CheckCircle2 className="w-4 h-4" />
            수강 완료
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                !isStudying ? "bg-white/20" : "bg-gray-200"
              )}
            >
              {completedCourses.length}
            </span>
          </button>
        </div>
      </header>

      {/* 강의 목록 */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <BookOpen className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-base">
            {isStudying
              ? "수강 중인 강의가 없습니다"
              : "수강 완료한 강의가 없습니다"}
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </section>
      )}
    </div>
  );
};

interface CourseCardProps {
  course: CourseDetail;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const progress = parseFloat(
    (
      (course.completedLectures / defaultTo(course.totalCourseLength, 1)) *
      100
    ).toFixed(1)
  );

  const isCompleted = progress === 100;

  return (
    <Link
      href={`/course/${course.courseId}`}
      className="group flex flex-col gap-3 p-4 rounded-2xl bg-white border border-gray-100 
                shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
    >
      {/* 썸네일 */}
      <div className="relative overflow-hidden rounded-xl">
        <AspectRatio ratio={16 / 9}>
          <ImageWithFallback
            className="object-cover w-full h-full 
                      group-hover:scale-105 transition-transform duration-300"
            alt={`${course.title} 썸네일`}
            src={getImageUrl(course.thumbnailPath)}
            width={500}
            height={281}
          />
        </AspectRatio>

        {/* 재생 버튼 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full 
                          bg-black/70 backdrop-blur-sm opacity-80 group-hover:opacity-100 
                          group-hover:scale-110 transition-all"
          >
            <Play fill="white" strokeWidth={0} className="w-5 h-5 ml-0.5" />
          </div>
        </div>

        {/* 완료 뱃지 */}
        {isCompleted && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 
                          rounded-full bg-green-500 text-white text-xs font-medium"
          >
            <CheckCircle2 className="w-3 h-3" />
            완료
          </div>
        )}
      </div>

      {/* 강의 정보 */}
      <div className="flex flex-col gap-2.5 pt-1">
        <h3
          className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug
                        group-hover:text-primary-blue transition-colors"
        >
          {course.title}
        </h3>

        {/* 진행률 */}
        <div className="space-y-2">
          <Progress
            indicatorColor={isCompleted ? "bg-green-500" : "bg-primary-blue"}
            className="h-2 bg-gray-100"
            value={progress}
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {course.completedLectures} / {course.totalCourseLength}강
            </span>
            <span
              className={cn(
                "font-medium",
                isCompleted ? "text-green-600" : "text-primary-blue"
              )}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { MyCourseList };
