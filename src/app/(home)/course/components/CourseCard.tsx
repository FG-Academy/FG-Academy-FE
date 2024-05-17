"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useFetchAllCourseListQuery } from "../../_hooks/useCourseQuery";

export default function CourseCard() {
  const router = useRouter();
  const [category, setCategory] = useState("전체");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const { data: courses, isPending, error } = useFetchAllCourseListQuery();

  useEffect(() => {
    if (courses) {
      // Extract unique categories from courses using Set and convert to Array
      const categoriesSet = new Set(courses.map((course) => course.curriculum));
      const categoriesArray = Array.from(categoriesSet);
      setUniqueCategories(["전체", ...categoriesArray]);
    }
  }, [courses]);

  if (isPending) return "로딩 중...";
  if (error) return "An error has occurred: " + error.message;

  const filteredCourses = courses.filter(
    (course) => category === "전체" || course.curriculum === category
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
            >
              {category}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>카테고리</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={category}
              onValueChange={setCategory}
            >
              {uniqueCategories.map((cat) => (
                <DropdownMenuRadioItem key={cat} value={cat}>
                  {cat}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h2 className="text-2xl font-bold mx-auto">{category}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {filteredCourses.map((ele) => (
          <div
            key={ele.courseId}
            id="courseInfo1"
            className="min-w-0 border shadow-xl rounded-2xl flex flex-col justify-between max-w-[410px] w-full mx-auto"
          >
            <Image
              className="rounded-2xl h-full"
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${ele.thumbnailImagePath}`}
              alt="강의 썸네일"
              priority
            />
            <div className="p-4 text-lg overflow-hidden">{ele.title}</div>
            <div className="p-2">
              <button
                className="w-full px-4 py-2 text-blue-600 transition-colors duration-150 bg-white border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  router.push(`/course/${ele.courseId}`);
                }}
              >
                강의 들으러 가기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
