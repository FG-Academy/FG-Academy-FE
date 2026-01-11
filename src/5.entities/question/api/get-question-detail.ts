import { apiClient } from "@/6.shared/api";
import type { Question } from "../model/question.type";

interface QuestionDetailResponse {
  message: string;
  post: Question;
}

export async function getQuestionDetail(questionId: number) {
  const response = await apiClient.get<QuestionDetailResponse>("/qna/posts", {
    params: { questionId },
  });
  return response.post;
}
