"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";
import { courseQueries } from "../../Api";
import { AspectRatio, ImageWithFallback, Typography } from "@/6.Shared/Ui";
import Link from "next/link";

export const CourseList = () => {
  const { data: categorizedCourses, error } = useSuspenseQuery(courseQueries.list());

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className="flex flex-col justify-center w-full">
      {categorizedCourses.map((category, idx) => (
        <React.Fragment key={category.name}>
          <div className="flex flex-col items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {category.courses.map((course) => (
                <Link
                  href={`/course/${course.courseId}`}
                  key={course.courseId}
                  className="flex flex-col gap-2"
                >
                  <AspectRatio ratio={16 / 9}>
                    <ImageWithFallback
                      className="object-cover h-full rounded-2xl border"
                      width={500}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailImagePath}`}
                      alt={course.title || "강의 썸네일"}
                      priority
                    />
                  </AspectRatio>
                  <Typography
                    name="small"
                    className="overflow-hidden line-clamp-2 text-sm md:text-base"
                  >
                    {course.title.replace(/\(\d+\)\s*/, "")}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
          {categorizedCourses.length !== idx + 1 && (
            <Separator className="my-4" color="black" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
