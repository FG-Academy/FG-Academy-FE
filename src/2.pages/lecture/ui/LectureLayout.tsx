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
    <div id="container" className="flex flex-row w-screen h-screen overflow-hidden bg-zinc-950">
      <div id="main-content" className="flex flex-1 flex-col w-full h-full relative overflow-hidden">
        <LectureHeader courseId={courseId} lectureId={lectureId} />
        <main className="flex-1 w-full h-full overflow-hidden relative">
          {children}
        </main>
      </div>
      <LectureNav courseId={courseId} lectureId={lectureId} />
    </div>
  );
}
