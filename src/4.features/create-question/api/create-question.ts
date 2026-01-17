import { apiClient } from "@/6.shared/api";
import type { QuestionFormValues } from "@/5.entities/question";

export interface CreateQuestionResponse {
  message: string;
}

export async function createQuestion(
  data: QuestionFormValues
): Promise<CreateQuestionResponse> {
  return await apiClient.post<CreateQuestionResponse>("/qna", data);
}
