import { apiClient } from "@/6.shared/api";

export interface DeleteQuestionResponse {
  message: string;
}

export async function deleteQuestion(
  questionId: number
): Promise<DeleteQuestionResponse> {
  return await apiClient.delete<DeleteQuestionResponse>(`/qna`, undefined, {
    params: { questionId },
  });
}
