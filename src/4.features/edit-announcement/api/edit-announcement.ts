import { Announcement } from "@/5.entities/announcement";
import { apiClient } from "@/6.shared/api";

export interface EditAnnouncementResponse {
  message: string;
}

export async function editAnnouncement(
  announcementId: number,
  data: Partial<Announcement>
): Promise<EditAnnouncementResponse> {
  const response = await apiClient.patch<EditAnnouncementResponse>(
    `/posts/${announcementId}`,
    data
  );
  return response;
}
