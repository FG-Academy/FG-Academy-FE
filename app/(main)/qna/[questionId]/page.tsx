import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { questionQueries } from "@/5.entities/question";
import { QuestionDetailPageContent } from "@/2.pages/question-detail";
import { Spinner } from "@/6.shared/ui";

type Props = {
  params: Promise<{ questionId: string }>;
};

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const id = parseInt(questionId, 10);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(questionQueries.detail(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full min-h-screen">
            <Spinner size="large" />
          </div>
        }
      >
        <QuestionDetailPageContent questionId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
