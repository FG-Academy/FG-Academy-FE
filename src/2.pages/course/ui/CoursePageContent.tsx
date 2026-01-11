"use client";

import { useState } from "react";
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

/**
 * 강의 목록 페이지 컨텐츠 (클라이언트 컴포넌트)
 * 카테고리 필터링 인터랙션을 담당
 */
export const CoursePageContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { data: categorizedCourses } = useSuspenseQuery(courseQueries.list());

  const categories = categorizedCourses.map((category) => category.name);

  return (
    <div className="p-4 space-y-6 w-full">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 px-4">
              {selectedCategory}
              <ChevronDownIcon size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuLabel>카테고리</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem value="전체">전체</DropdownMenuRadioItem>
              {categories.map((categoryName) => (
                <DropdownMenuRadioItem key={categoryName} value={categoryName}>
                  {categoryName}
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
