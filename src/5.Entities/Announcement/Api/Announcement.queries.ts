import { queryOptions } from "@tanstack/react-query";
import { getAnnouncements } from "./get-announcements";

export const announcementQueries = {
  all: () => ["announcement"],
  lists: () => [...announcementQueries.all(), "list"],
  list: (page: number) =>
    queryOptions({
      queryKey: [...announcementQueries.lists(), page],
      queryFn: () => getAnnouncements(page),
    }),
};
