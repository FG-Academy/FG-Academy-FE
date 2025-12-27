import { apiClient } from "@/6.shared/api";

export async function createCourse(formData: FormData): Promise<void> {
  return apiClient.postFormData("/admin/courses", formData);
}
