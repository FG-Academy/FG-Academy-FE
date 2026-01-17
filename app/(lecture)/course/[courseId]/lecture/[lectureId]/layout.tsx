"use client";

import { LectureLayout } from "@/2.pages/lecture";

type Props = {
  params: { courseId: string; lectureId: string };
  children: React.ReactNode;
};

export default function Layout({ children, params }: Props) {
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  return (
    <LectureLayout courseId={courseId} lectureId={lectureId}>
      {children}
    </LectureLayout>
  );
}
