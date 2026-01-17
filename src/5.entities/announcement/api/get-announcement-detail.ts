import { apiClient } from "@/6.shared/api";
import type { Announcement } from "../model/announcement.type";

export async function getAnnouncementDetail(announcementId: number) {
  return await apiClient.get<Announcement>(`/posts/${announcementId}`);
}
