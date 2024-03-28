import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LectureVideo from "./components/LectureVideo";
import { getLectures } from "./lib/getLectures";
import { getProgress } from "./lib/getProgress";
import { auth } from "@/auth";

type Props = {
  params: { lectureId: number; courseId: number };
};

export default async function Page({ params }: Props) {
  const { lectureId, courseId } = params;
  const session = await auth();
  const accessToken = session?.user.accessToken as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId, accessToken),
  });
  await queryClient.prefetchQuery({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId, accessToken),
  });
  const dehydratedState = dehydrate(queryClient);

  console.log(session);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LectureVideo courseId={courseId} lectureId={lectureId} />
    </HydrationBoundary>
  );
}
