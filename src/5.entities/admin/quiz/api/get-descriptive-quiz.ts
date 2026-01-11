import { apiClient } from "@/6.shared/api";
import type { AdminDescriptiveQuizDetail } from "../model/quiz.types";

/** Fetch descriptive quiz detail for grading */
export async function getAdminDescriptiveQuiz(
  userId: number,
  quizId: number
): Promise<AdminDescriptiveQuizDetail> {
  return apiClient.get<AdminDescriptiveQuizDetail>(
    `/admin/quizzes/descriptive/${userId}/${quizId}`
  );
}
