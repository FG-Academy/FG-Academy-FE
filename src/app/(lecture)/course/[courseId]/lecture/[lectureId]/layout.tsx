import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LectureHeader from "./components/LectureHeader";
import LectureNav from "./components/LectureNav";
import { getProgress } from "./lib/getProgress";
import { auth } from "@/auth";
import { getMyCourses } from "./lib/getMyCourses";

type Props = {
  params: { courseId: string; lectureId: string };
  children: React.ReactNode;
};
export default async function LectureLayout({ children, params }: Props) {
  // const { courseId, lectureId } = params;
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  const session = await auth();
  const accessToken = session?.user.accessToken as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId, accessToken),
  });
  await queryClient.prefetchQuery({
    queryKey: ["myCourses", courseId],
    queryFn: () => getMyCourses(courseId, accessToken),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      id="container"
      className="flex flex-row w-screen h-screen overflow-hidden"
    >
      <HydrationBoundary state={dehydratedState}>
        <div id="main-content" className="flex flex-1 flex-col w-full h-auto">
          <LectureHeader courseId={courseId} lectureId={lectureId} />
          {children}
        </div>
        <LectureNav courseId={courseId} lectureId={lectureId} />
      </HydrationBoundary>
    </div>
  );
}
