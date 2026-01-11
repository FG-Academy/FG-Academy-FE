import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { questionQueries } from "@/5.entities/question";
import { QuestionListPageContent } from "@/2.pages/question";
import { Spinner } from "@/6.shared/ui";

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(questionQueries.list(currentPage));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full min-h-screen">
            <Spinner size="large" />
          </div>
        }
      >
        <QuestionListPageContent page={currentPage} />
      </Suspense>
    </HydrationBoundary>
  );
}
