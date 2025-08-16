import { queryOptions } from "@tanstack/react-query";
import { AnnouncementsResponse } from "./Announcement.dto";
import { getAnnouncements } from "./getAnnouncements";

export const announcementQueries = {
  all: () => ["announcement"],
  lists: () => [...announcementQueries.all(), "list"],
  list: (page: number) =>
    queryOptions<AnnouncementsResponse>({
      queryKey: [...announcementQueries.lists(), page],
      queryFn: () => getAnnouncements(page),
    }),
};
