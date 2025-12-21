import { apiClient } from "@/6.shared/api";
import type { MyCoursesResponse } from "../model/course.type";

export const getMyCourses = async () => {
  const data = await apiClient.get<MyCoursesResponse>(`/dashboard`);
  return data;
};
