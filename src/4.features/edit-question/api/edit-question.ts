import { apiClient } from "@/6.shared/api";
import type { QuestionPatchFormValues } from "@/5.entities/question";

export interface EditQuestionResponse {
  message: string;
}

export async function editQuestion(
  questionId: number,
  data: QuestionPatchFormValues
): Promise<EditQuestionResponse> {
  return await apiClient.patch<EditQuestionResponse>(`/qna`, data, {
    params: { questionId },
  });
}
