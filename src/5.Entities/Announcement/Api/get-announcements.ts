import { apiClient } from "@/6.shared/api";
import { AnnouncementsResponse } from "../model/Announcement.type";

export async function getAnnouncements(page: number) {
  return await apiClient.get<AnnouncementsResponse>("/posts", {
    params: { page },
  });
}
