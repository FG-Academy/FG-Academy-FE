"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { enrollmentQueries } from "@/5.entities/enrollment";

interface LectureHeaderProps {
  courseId: number;
  lectureId: number;
}

export function LectureHeader({ courseId, lectureId }: LectureHeaderProps) {
  const { data: course } = useSuspenseQuery(
    enrollmentQueries.myCourseLectures(courseId)
  );

  const pathname = usePathname();

  const { duration } = useDurationStore((state) => state);
  const seconds = useSecondsStore((state) => state.seconds);

  const currentLecture = course.lectures.find((l) => l.lectureId === lectureId);

  return (
    <header
      id="header"
      className="shrink-0 h-16 z-20 flex flex-row items-center justify-between px-4 border-b border-zinc-800 bg-zinc-950 text-zinc-100"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <Link
          href="/me/course"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 transition-colors rounded-md hover:text-white hover:bg-zinc-800/50 whitespace-nowrap"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>나가기</span>
        </Link>
        
        <div className="h-4 w-px bg-zinc-800 mx-2 hidden md:block" />
        
        <h1 className="text-sm md:text-base font-medium truncate text-zinc-200">
          <span className="text-zinc-500 mr-2">
            {currentLecture?.lectureNumber?.toString().padStart(2, '0')}
          </span>
          {currentLecture?.lectureTitle}
        </h1>
      </div>

      {!(pathname.includes("multiple") || pathname.includes("descriptive")) && (
        <div className="flex items-center gap-2 px-3 py-1.5 ml-4 text-xs font-medium tracking-wide rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
          <span className={seconds >= duration ? "text-emerald-500" : "text-white"}>
            {Math.floor(seconds / 60).toString().padStart(2, '0')}:{Math.floor(seconds % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-zinc-600">/</span>
          <span>
            {Math.floor(duration / 60).toString().padStart(2, '0')}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </header>
  );
}
