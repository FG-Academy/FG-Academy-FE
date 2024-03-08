export default function CourseDetailPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  console.log(courseId);
  return <div>{courseId}</div>;
}
