import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LectureVideo from "./components/LectureVideo";
import { getLectures } from "./lib/getLectures";
import { getProgress } from "./lib/getProgress";

type Props = {
  params: { lectureId: number; courseId: number };
};

export default async function Page({ params }: Props) {
  const { lectureId, courseId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LectureVideo courseId={courseId} lectureId={lectureId} />
    </HydrationBoundary>
  );
}
