import { apiClient } from "@/6.Shared/Api";
import { AnnouncementsResponse } from "./Announcement.dto";

export async function getAnnouncements(page: number) {
  return await apiClient.get<AnnouncementsResponse>("/posts", {
    params: { page },
  });
}
