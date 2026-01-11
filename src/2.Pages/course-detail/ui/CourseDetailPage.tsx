import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { courseQueries } from "@/5.entities/course";
import { lectureQueries } from "@/5.entities/lecture";
import { enrollmentQueries } from "@/5.entities/enrollment";
import { CourseDetailWidget } from "@/3.widgets/course-detail";

type Props = { courseId: number };

export async function CourseDetailPage({ courseId }: Props) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(courseQueries.detail(courseId)),
    queryClient.prefetchQuery(lectureQueries.byCourse(courseId)),
    queryClient.prefetchQuery(enrollmentQueries.byCourse(courseId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailWidget courseId={courseId} />
    </HydrationBoundary>
  );
}
