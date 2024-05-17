"use client";

import CourseDetail from "./components/CourseDetail";

type Props = {
  params: { courseId: string };
};

export default function CourseDetailPage({ params }: Props) {
  const courseId = parseInt(params.courseId);
  return (
    <div className="w-full p-10">
      <CourseDetail courseId={courseId} />
    </div>
  );
}
