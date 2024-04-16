"use client";

import CourseDetail from "./components/CourseDetail";

export default function CourseDetailPage({
  params: { courseId },
}: {
  params: { courseId: number };
}) {
  return (
    <div className="w-full p-10">
      <CourseDetail courseId={courseId} />
    </div>
  );
}
