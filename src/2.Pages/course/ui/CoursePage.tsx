"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/6.shared/ui";
import { CourseList, courseQueries } from "@/5.entities/course";

const CoursePageContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { data: categorizedCourses } = useSuspenseQuery(courseQueries.list());

  const categories = categorizedCourses.map((category) => category.name);

  return (
    <div className="p-4 space-y-6 w-full">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 px-4">
              {selectedCategory}
              <ChevronDownIcon size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>카테고리</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem value="전체">전체</DropdownMenuRadioItem>
              {categories.map((categoryName) => (
                <DropdownMenuRadioItem key={categoryName} value={categoryName}>
                  {categoryName.replace(/^\d+\s*/, "")}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CourseList selectedCategory={selectedCategory} />
    </div>
  );
};

const CoursePage = () => {
  return (
    <div>
      <div
        id="header"
        className="relative flex flex-col justify-center top-0 left-0 right-0 w-full"
      >
        <Image
          src="/images/courseBackground.jpeg"
          width={0}
          height={0}
          style={{ width: "100%", height: "240px", objectFit: "cover" }}
          alt="강의 목록 배경"
        />
        <h2 className="absolute left-16 text-4xl text-start font-sans font-medium text-white z-20">
          강의목록
        </h2>
      </div>
      <section
        id="body"
        className="flex justify-center w-full mx-auto h-max p-10"
      >
        <Suspense fallback={<div>Loading courses...</div>}>
          <CoursePageContent />
        </Suspense>
      </section>
    </div>
  );
};

export { CoursePage };
