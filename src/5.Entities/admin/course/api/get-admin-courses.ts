import { apiClient } from "@/6.shared/api";
import type { AdminCourse } from "../model/course.types";

export async function getAdminCourses(): Promise<AdminCourse[]> {
  return apiClient.get<AdminCourse[]>("/admin/courses");
}
