import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LectureHeader from "./components/LectureHeader";
import LectureNav from "./components/LectureNav";
import { getLectures } from "./lib/getLectures";
import { getProgress } from "./lib/getProgress";
import { getCourses } from "./lib/getCourses";

type Props = {
  params: { courseId: number; lectureId: number };
  children: React.ReactNode;
};
export default async function LectureLayout({ children, params }: Props) {
  const { courseId, lectureId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourses(courseId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div id="container" className="flex flex-row w-screen h-screen">
      <HydrationBoundary state={dehydratedState}>
        <div id="main-content" className="flex flex-1 flex-col h-auto">
          <LectureHeader courseId={courseId} lectureId={lectureId} />
          {children}
        </div>
        <LectureNav courseId={courseId} lectureId={lectureId} />
      </HydrationBoundary>
    </div>
  );
}
