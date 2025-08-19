import { CourseDetailPage } from "@/2.pages/course-detail";
import { notFound } from "next/navigation";

type Props = {
  params: { courseId: string };
};

export default function Page({ params }: Props) {
  const courseId = Number(params.courseId);
  if (!Number.isFinite(courseId) || courseId <= 0) return notFound();

  return <CourseDetailPage courseId={courseId} />;
}
