import { apiClient } from "@/6.shared/api";
import type { CoursesResponse } from "../model/course.type";

export async function getCourseDetail(courseId: number) {
  const data = await apiClient.get<CoursesResponse>(`/courses/${courseId}`);
  return data;
}
