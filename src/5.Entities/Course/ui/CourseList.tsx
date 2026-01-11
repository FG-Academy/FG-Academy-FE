"use client";

import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AspectRatio, ImageWithFallback } from "@/6.shared/ui";
import Link from "next/link";
import { getImageUrl } from "@/6.shared/lib";
import { courseQueries } from "../api/course.queries";

interface CourseListProps {
  selectedCategory?: string;
}

export const CourseList = ({ selectedCategory }: CourseListProps) => {
  const { data: categorizedCourses, error } = useSuspenseQuery(
    courseQueries.list()
  );

  if (error) return `An error has occurred: ${error.message}`;

  // 선택된 카테고리가 있으면 필터링
  const filteredCourses =
    selectedCategory && selectedCategory !== "전체"
      ? categorizedCourses.filter(
          (category) => category.name === selectedCategory
        )
      : categorizedCourses;

  // 기본 카테고리별 분리 표시 (Main 페이지용)
  return (
    <div className="flex flex-col justify-center w-full gap-12 md:gap-16">
      {filteredCourses.map((category) => (
        <section key={category.name} className="flex flex-col">
          {/* 섹션 타이틀 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary-blue rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {category.name}
            </h2>
          </div>

          {/* 강의 그리드 */}
          <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {category.courses.map((course) => (
              <Link
                href={`/course/${course.courseId}`}
                key={course.courseId}
                className="group flex flex-col gap-3"
              >
                {/* 썸네일 */}
                <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <AspectRatio ratio={16 / 9}>
                    <ImageWithFallback
                      className="object-cover w-full h-full 
                                 group-hover:scale-105 transition-transform duration-300 ease-out"
                      width={500}
                      height={281}
                      src={getImageUrl(course.thumbnailImagePath)}
                      alt={course.title || "강의 썸네일"}
                    />
                  </AspectRatio>
                </div>

                {/* 강의 제목 */}
                <h3
                  className="text-sm md:text-base font-medium text-gray-800 
                             line-clamp-2 leading-snug
                             group-hover:text-primary-blue transition-colors duration-200"
                >
                  {course.title.replace(/\(\d+\)\s*/, "")}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
