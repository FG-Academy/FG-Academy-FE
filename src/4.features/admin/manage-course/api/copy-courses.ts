import { apiClient } from "@/6.shared/api";

export async function copyCourses(courseIds: number[]): Promise<void> {
  return apiClient.post("/admin/courses/copy", { courseIds });
}
