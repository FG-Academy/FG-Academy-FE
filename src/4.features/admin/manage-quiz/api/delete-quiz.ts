import { apiClient } from "@/6.shared/api";

/** Delete a quiz */
export async function deleteQuiz(quizId: number): Promise<void> {
  return apiClient.delete(`/admin/quizzes/delete/${quizId}`);
}
