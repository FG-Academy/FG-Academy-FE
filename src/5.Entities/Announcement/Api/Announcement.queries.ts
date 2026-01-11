import { queryOptions } from "@tanstack/react-query";
import { getAnnouncements } from "./get-announcements";
import { getAnnouncementDetail } from "./get-announcement-detail";

export const announcementQueries = {
  all: () => ["announcement"],
  lists: () => [...announcementQueries.all(), "list"],
  list: (page: number) =>
    queryOptions({
      queryKey: [...announcementQueries.lists(), page],
      queryFn: () => getAnnouncements(page),
    }),
  detail: (announcementId: number) =>
    queryOptions({
      queryKey: [...announcementQueries.all(), "detail", announcementId],
      queryFn: () => getAnnouncementDetail(announcementId),
    }),
};
