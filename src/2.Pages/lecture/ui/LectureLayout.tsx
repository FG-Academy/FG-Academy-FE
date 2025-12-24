"use client";

import { LectureHeader, LectureNav } from "@/3.widgets/lecture-player";

interface LectureLayoutProps {
  courseId: number;
  lectureId: number;
  children: React.ReactNode;
}

export function LectureLayout({
  courseId,
  lectureId,
  children,
}: LectureLayoutProps) {
  return (
    <div id="container" className="flex flex-row w-screen h-screen">
      <div id="main-content" className="flex flex-1 flex-col w-full h-full">
        <LectureHeader courseId={courseId} lectureId={lectureId} />
        {children}
      </div>
      <LectureNav courseId={courseId} lectureId={lectureId} />
    </div>
  );
}
