import { apiClient } from "@/6.shared/api";

export interface DeleteAnnouncementResponse {
  message: string;
}

export async function deleteAnnouncement(
  announcementIds: number[]
): Promise<DeleteAnnouncementResponse> {
  const data = await apiClient.delete<DeleteAnnouncementResponse>(`/posts`, {
    announcementIds,
  });
  return data;
}
