import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { courseQueries } from "@/5.entities/course";
import { quizQueries } from "@/5.entities/quiz";
import { MyCoursePageContent } from "@/2.pages/my-course";
import { Spinner } from "@/6.shared/ui";

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch both queries for course and quiz tabs
  await Promise.all([
    queryClient.prefetchQuery(courseQueries.myCourses()),
    queryClient.prefetchQuery(quizQueries.coursesForQuiz()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner />
          </div>
        }
      >
        <MyCoursePageContent />
      </Suspense>
    </HydrationBoundary>
  );
}
