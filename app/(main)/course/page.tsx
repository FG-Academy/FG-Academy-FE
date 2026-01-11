import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { courseQueries } from "@/5.entities/course";
import { CoursePage } from "@/2.pages/course";

export default async function Page() {
  const queryClient = new QueryClient();

  // 서버에서 강의 목록 prefetch
  await queryClient.prefetchQuery(courseQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursePage />
    </HydrationBoundary>
  );
}
