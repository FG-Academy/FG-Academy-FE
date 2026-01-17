import { apiClient } from "@/6.shared/api";
import type { QuestionsResponse } from "../model/question.type";

export async function getQuestions(page: number) {
  return await apiClient.get<QuestionsResponse>("/qna", {
    params: { page },
  });
}
