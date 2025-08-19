import { apiClient } from "@/6.shared/api";
import { CourseLecture } from "../model/lecture.type";

export async function getLecturesByCourse(courseId: number) {
  const data = await apiClient.get<CourseLecture[]>(
    `/courses/${courseId}/lectures`
  );
  return data;
}
