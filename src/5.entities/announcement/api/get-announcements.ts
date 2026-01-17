import { apiClient } from "@/6.shared/api";
import type { AnnouncementsResponse } from "../model/announcement.type";

export async function getAnnouncements(page: number) {
  return await apiClient.get<AnnouncementsResponse>("/posts", {
    params: { page },
  });
}
