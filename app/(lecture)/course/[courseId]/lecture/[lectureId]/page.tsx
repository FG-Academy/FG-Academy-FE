import { LecturePage } from "@/2.pages/lecture";
import { enrollmentQueries } from "@/5.entities/enrollment";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: { lectureId: string; courseId: string };
};

export default async function Page({ params }: Props) {
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(enrollmentQueries.myCourseLectures(courseId)),
    queryClient.prefetchQuery(enrollmentQueries.lectureProgress(courseId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LecturePage courseId={courseId} lectureId={lectureId} />
    </HydrationBoundary>
  );
}
