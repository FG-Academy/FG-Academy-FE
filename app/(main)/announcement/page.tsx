import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement";
import { AnnouncementPageContent } from "@/2.pages/announcement";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(announcementQueries.list(page));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <AnnouncementPageContent page={page} />
      </Suspense>
    </HydrationBoundary>
  );
}
