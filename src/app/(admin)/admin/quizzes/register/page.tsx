"use client";

import * as React from "react";

import { RegisterQuizTable } from "./components/RegisterQuizTable";
import { RegisterQuizColumn } from "./components/RegisterTableColumn";
import { useSession } from "next-auth/react";
import { useFetchAllLectureListQuery } from "@/hooks/useLectureQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useState } from "react";
import { useFetchAllAdminCourseListQuery } from "../../hooks/useAdminCourseQuery";
import { DataTable } from "../../videos/components/DataTable";
import { courseColumn } from "./components/CourseTableColumn";
import useSelectedCourseIdStore from "@/store/useSelectedCourseIdStore";
import { Button } from "@/components/ui/button";

type CourseOption = {
  courseId: number;
  title: string;
};

export default function RegisterQuizPage() {
  // const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const { selectedCourseId, setSelectedCourseId } = useSelectedCourseIdStore(
    (state) => state
  );

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: courses } = useFetchAllAdminCourseListQuery(accessToken);

  const { data: lectures } = useFetchAllLectureListQuery(
    accessToken,
    selectedCourseId
  );

  if (!courses) return <Loading />;

  return (
    <main id="main" className="flex flex-col w-full items-start p-8 space-y-4">
      <div
        id="div1"
        className="flex flex-row w-full items-start p-2 border-b-2 border-gray-300 "
      >
        <h2 className="text-2xl font-sans">퀴즈 등록 화면</h2>
      </div>
      {selectedCourseId ? (
        <div className="flex flex-row w-full justify-between p-2">
          <div className="font-bold text-2xl">
            {
              courses.find((course) => course.courseId === selectedCourseId)
                ?.title
            }
          </div>
          <Button
            disabled={selectedCourseId === null}
            className="bg-blue-500"
            onClick={() => setSelectedCourseId(null)}
          >
            코스 선택 화면
          </Button>
        </div>
      ) : null}

      <div id="div3" className="flex flex-col w-full h-[540px] p-2">
        {lectures && selectedCourseId ? (
          <RegisterQuizTable columns={RegisterQuizColumn} data={lectures} />
        ) : (
          <DataTable columns={courseColumn} data={courses} isQuizTable={true} />
        )}
      </div>
    </main>
  );
}
