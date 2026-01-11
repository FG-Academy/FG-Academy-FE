import { apiClient } from "@/6.shared/api";
import type { AdminLectureQuiz } from "../model/quiz.types";

/** Fetch quizzes for a specific lecture */
export async function getAdminLectureQuizzes(
  lectureId: number
): Promise<AdminLectureQuiz[]> {
  return apiClient.get<AdminLectureQuiz[]>(`/quizzes/lectures/${lectureId}`);
}
