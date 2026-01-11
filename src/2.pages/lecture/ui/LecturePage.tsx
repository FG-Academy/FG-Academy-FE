"use client";

import { LectureVideo } from "@/3.widgets/lecture-player";

interface LecturePageProps {
  courseId: number;
  lectureId: number;
}

export function LecturePage({ courseId, lectureId }: LecturePageProps) {
  return <LectureVideo courseId={courseId} lectureId={lectureId} />;
}
