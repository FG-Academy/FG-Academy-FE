import { apiClient } from "@/6.shared/api";

export async function deleteCourses(courseIds: number[]): Promise<void> {
  return apiClient.delete("/admin/courses", { courseIds });
}
