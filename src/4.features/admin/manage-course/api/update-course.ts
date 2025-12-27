import { apiClient } from "@/6.shared/api";

export async function updateCourse(
  courseId: number,
  formData: FormData
): Promise<void> {
  return apiClient.patchFormData(`/admin/courses/${courseId}`, formData);
}
