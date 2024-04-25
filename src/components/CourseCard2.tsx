"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchAllCourseListQuery } from "@/hooks/useCourseQuery";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function CourseCard() {
  const router = useRouter();
  const { data: courses, isPending, error } = useFetchAllCourseListQuery();
  const [categories, setCategories] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    if (courses) {
      const newCategories: { [key: string]: any[] } = {};
      courses.forEach((course) => {
        const category = course.curriculum || "기타"; // Default category if none is specified
        if (!newCategories[category]) {
          newCategories[category] = [];
        }
        newCategories[category].push(course);
      });
      setCategories(newCategories);
    }
  }, [courses]);

  if (isPending) return "로딩 중...";
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className="p-4 space-y-6">
      {Object.keys(categories).map((category) => (
        <div className="flex flex-col items-center space-y-2" key={category}>
          <h2 className="text-2xl font-bold">{category}</h2>{" "}
          {/* 카테고리 이름 표시 */}
          <div className="p-6 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {categories[category].map((course) => (
              <div
                key={course.courseId}
                className="min-w-0 flex-shrink-0 shadow-xl rounded-2xl flex flex-col justify-between max-w-[410px] w-full mx-auto"
              >
                <Image
                  className="rounded-md"
                  width={500}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailImagePath}`}
                  alt="강의 썸네일"
                  priority
                />
                <div className="p-4 text-lg overflow-hidden">
                  {course.title}
                </div>
                <div className="p-2">
                  <button
                    className="w-full px-4 py-2 text-blue-600 transition-colors duration-150 bg-white border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
                    onClick={() => {
                      router.push(`/course/${course.courseId}`);
                    }}
                  >
                    강의 들으러 가기
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Separator color="black" />
        </div>
      ))}
    </div>
  );
}