import { apiClient } from "@/6.shared/api";
import type { AdminLectureForQuiz } from "../model/quiz.types";

/** Fetch all lectures for a course (for quiz registration) */
export async function getAdminCourseLectures(
  courseId: number
): Promise<AdminLectureForQuiz[]> {
  return apiClient.get<AdminLectureForQuiz[]>(`/courses/${courseId}/lectures`);
}
