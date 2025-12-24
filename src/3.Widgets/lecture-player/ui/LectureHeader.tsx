"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { enrollmentQueries } from "@/5.entities/enrollment";
import { Skeleton } from "@/6.shared/ui";

interface LectureHeaderProps {
  courseId: number;
  lectureId: number;
}

export function LectureHeader({ courseId, lectureId }: LectureHeaderProps) {
  const { data: course } = useQuery(
    enrollmentQueries.myCourseLectures(courseId)
  );

  const pathname = usePathname();

  const { duration } = useDurationStore((state) => state);
  const seconds = useSecondsStore((state) => state.seconds);

  if (!course) {
    return <Skeleton className="w-full h-[56px] rounded-full" />;
  }

  const currentLecture = course.lectures.find((l) => l.lectureId === lectureId);

  return (
    <div
      id="header"
      className="text-sm md:text-base relative flex flex-row items-center space-x-4 bg-blue-500 text-white"
    >
      <Link
        href="/me/course"
        className="flex flex-row rounded-r-lg h-full space-x-2 p-4 items-center justify-start bg-blue-700"
      >
        <ChevronLeft />
        <div className="text-nowrap">대시보드</div>
      </Link>
      <div className="flex flex-row justify-between items-center w-full space-x-1">
        <div className="relative flex overflow-x-hidden">
          <span className="break-words">
            {currentLecture?.lectureNumber}강: {currentLecture?.lectureTitle}
          </span>
        </div>
        {!(
          pathname.includes("multiple") || pathname.includes("descriptive")
        ) && (
          <div className="text-center text-nowrap px-4">
            {Math.floor(seconds / 60)}분/{Math.floor(duration / 60)}분
          </div>
        )}
      </div>
    </div>
  );
}
