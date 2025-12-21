import { AnnouncementDetailPage } from "@/2.pages/announcement-detail";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

type Props = {
  params: { announcementId: string };
};

export default async function Page({ params }: Props) {
  const queryClient = new QueryClient();

  const announcementId = Number(params.announcementId);
  if (!Number.isFinite(announcementId) || announcementId <= 0)
    return notFound();

  await queryClient.prefetchQuery(announcementQueries.detail(announcementId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnnouncementDetailPage announcementId={announcementId} />
    </HydrationBoundary>
  );
}
