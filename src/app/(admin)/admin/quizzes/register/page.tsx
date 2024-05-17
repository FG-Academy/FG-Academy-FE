"use client";

import * as React from "react";

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
import { RegisterQuizTable } from "./components/RegisterQuizTable";
import { RegisterQuizColumn } from "./components/RegisterTableColumn";
import { useSession } from "next-auth/react";
import { useFetchAllLectureListQuery } from "@/hooks/useLectureQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useState } from "react";
import { useFetchAllAdminCourseListQuery } from "../../hooks/useAdminCourseQuery";

type CourseOption = {
  courseId: number;
  title: string;
};

export default function RegisterQuizPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: courses } = useFetchAllAdminCourseListQuery(accessToken);

  const { data: lectures } = useFetchAllLectureListQuery(
    accessToken,
    selectedCourseId
  );

  if (!courses) return <Loading />;

  const courseOptions: CourseOption[] = courses.map((course) => ({
    courseId: course.courseId,
    title: course.title,
  }));

  return (
    <main id="main" className="flex flex-col w-full h-screen items-start p-8">
      <div
        id="div1"
        className="flex flex-row w-full items-start p-2 border-b-2 border-gray-300 "
      >
        <h2 className="text-2xl font-sans">퀴즈 등록 화면</h2>
      </div>
      <div id="div2" className="flex flex-row p-2 mt-2  items-center">
        <p className="text-base font-bold font-sans mr-4 text-center">
          코스 선택
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedCourseId
                ? courseOptions.find(
                    (option) => option.courseId === selectedCourseId
                  )?.title
                : "코스 선택"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>코스를 선택해주세요</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCourseId?.toString() || ""}
              onValueChange={(value) => setSelectedCourseId(parseInt(value))}
            >
              {courseOptions.map(({ courseId, title }) => (
                <DropdownMenuRadioItem
                  key={courseId}
                  value={courseId.toString()}
                >
                  {title}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div id="div3" className="flex flex-col w-full h-full p-2 ">
        <div
          id="div3-1"
          className="flex w-full h-full items-start justify-center overflow-y-scroll"
        >
          {lectures && selectedCourseId ? (
            <RegisterQuizTable columns={RegisterQuizColumn} data={lectures} />
          ) : (
            <div>코스를 선택해주세요</div>
          )}
        </div>
        {/* <div
          id="div3-2"
          className="flex flex-row w-full h-auto mt-2 bg-yellow-300 items-start justify-end p-4"
        >
          페이지 네이션 들어갈 곳
        </div> */}
      </div>
    </main>
  );
}
