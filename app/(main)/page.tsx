import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement";
import { courseQueries } from "@/5.entities/course";
import { MainPageContent } from "@/2.pages/main";

export default async function Page() {
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetch
  await Promise.all([
    queryClient.prefetchQuery(announcementQueries.list(1)),
    queryClient.prefetchQuery(courseQueries.list()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPageContent />
    </HydrationBoundary>
  );
}
