import { Announcement } from "@/5.entities/announcement";
import { apiClient } from "@/6.shared/api";

export interface CreateAnnouncementResponse {
  message: string;
}

export async function createAnnouncement(
  data: Partial<Announcement>
): Promise<CreateAnnouncementResponse> {
  const response = await apiClient.post<CreateAnnouncementResponse>(
    `/posts`,
    data
  );
  return response;
}
