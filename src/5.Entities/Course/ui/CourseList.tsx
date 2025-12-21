"use client";

import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AspectRatio,
  ImageWithFallback,
  Separator,
  Typography,
} from "@/6.shared/ui";
import Link from "next/link";
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
    <div className="flex flex-col justify-center w-full">
      {filteredCourses.map((category, idx) => (
        <React.Fragment key={category.name}>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {category.courses.map((course) => (
                <Link
                  href={`/course/${course.courseId}`}
                  key={course.courseId}
                  className="flex flex-col gap-2"
                >
                  <AspectRatio ratio={16 / 9}>
                    <ImageWithFallback
                      className="object-cover h-full border rounded-2xl"
                      width={500}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailImagePath}`}
                      alt={course.title || "강의 썸네일"}
                      priority
                    />
                  </AspectRatio>
                  <Typography
                    name="small"
                    className="overflow-hidden text-sm line-clamp-2 md:text-base"
                  >
                    {course.title.replace(/\(\d+\)\s*/, "")}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
          {filteredCourses.length !== idx + 1 && (
            <Separator className="my-8" color="black" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
