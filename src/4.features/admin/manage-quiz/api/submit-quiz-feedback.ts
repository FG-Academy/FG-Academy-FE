import { apiClient } from "@/6.shared/api";
import type { AdminQuizFeedbackRequest } from "@/5.entities/admin/quiz";

interface SubmitQuizFeedbackParams {
  userId: number;
  quizId: number;
  feedbackComment: string;
  corrected: boolean;
}

/** Submit quiz feedback for grading */
export async function submitQuizFeedback({
  userId,
  quizId,
  feedbackComment,
  corrected,
}: SubmitQuizFeedbackParams): Promise<void> {
  const body: AdminQuizFeedbackRequest = {
    feedbackComment,
    corrected,
  };

  return apiClient.post(`/admin/quizzes/feedback/${userId}/${quizId}`, body);
}
