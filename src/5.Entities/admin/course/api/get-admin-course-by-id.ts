import { apiClient } from "@/6.shared/api";
import type { AdminCourseDetail } from "../model/course.types";

export async function getAdminCourseById(
  courseId: number
): Promise<AdminCourseDetail> {
  return apiClient.get<AdminCourseDetail>(`/admin/courses/${courseId}`);
}
