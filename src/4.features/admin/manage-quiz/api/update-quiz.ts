import { apiClient } from "@/6.shared/api";
import type { AdminQuizFormRequest } from "@/5.entities/admin/quiz";

interface UpdateQuizParams {
  quizId: number;
  data: AdminQuizFormRequest;
}

/** Update an existing quiz */
export async function updateQuiz({
  quizId,
  data,
}: UpdateQuizParams): Promise<void> {
  return apiClient.patch(`/admin/quizzes/edit/${quizId}`, data);
}
