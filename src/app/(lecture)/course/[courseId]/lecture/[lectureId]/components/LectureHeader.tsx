"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { usePathname } from "next/navigation";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { useMyCoursesQuery } from "../hooks/useMyCoursesQuery";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function MainHeader({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: course } = useMyCoursesQuery(accessToken, courseId);

  const pathname = usePathname();

  const { duration } = useDurationStore((state) => state);
  const seconds = useSecondsStore((state) => state.seconds);

  if (!course) {
    return <Skeleton className="w-full h-[56px] rounded-full" />; // Skeleton 컴포넌트를 사용
  }

  return (
    <div
      id="header"
      className="text-sm md:text-base relative flex flex-row items-center space-x-4 bg-blue-500 text-white"
    >
      <Link
        href="/course"
        className="flex flex-row rounded-r-lg h-full space-x-2 p-4 items-center justify-start bg-blue-700"
      >
        <ChevronLeft />
        <div className="text-nowrap">대시보드</div>
      </Link>
      <div className="flex flex-row justify-between items-center w-full space-x-1">
        <div className="relative flex overflow-x-hidden">
          <span className="break-words">
            {
              course.lectures.find((l) => l.lectureId === lectureId)
                ?.lectureNumber
            }
            강:{" "}
            {
              course.lectures.find((l) => l.lectureId === lectureId)
                ?.lectureTitle
            }
          </span>
        </div>
        {!(
          pathname.includes("multiple") || pathname.includes("descriptive")
        ) && (
          <div className="text-center text-nowrap px-4">
            {Math.floor(seconds / 60)}분/
            {Math.floor(duration / 60)}분
            {/* (
            {`${
              !seconds || !duration
                ? 0
                : Math.floor((seconds / (duration - 3)) * 100) >= 100
                ? 100
                : Math.floor((seconds / (duration - 3)) * 100)
            }%`}
            ) */}
          </div>
        )}
      </div>
    </div>
  );
}
