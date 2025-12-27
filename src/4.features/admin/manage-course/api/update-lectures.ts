import { apiClient } from "@/6.shared/api";
import type { LecturesFormData } from "@/5.entities/admin/course";

export async function updateLectures(
  courseId: number,
  data: LecturesFormData
): Promise<void> {
  return apiClient.post(`/admin/courses/${courseId}/lectures`, data);
}
