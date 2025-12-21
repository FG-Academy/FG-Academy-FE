import { apiClient } from "@/6.shared/api";
import type { AnswerFormValues } from "@/5.entities/question";

export interface CreateAnswerResponse {
  message: string;
}

export async function createAnswer(
  questionId: number,
  data: AnswerFormValues
): Promise<CreateAnswerResponse> {
  return await apiClient.post<CreateAnswerResponse>("/qna/answers", data, {
    params: { questionId },
  });
}
