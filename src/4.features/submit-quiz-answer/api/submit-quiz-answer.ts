import { apiClient } from "@/6.shared/api";

interface SubmitQuizAnswerParams {
  quizId: number;
  answer: string;
  multipleAnswer: 0 | 1; // 0: 주관식, 1: 객관식
}

interface SubmitQuizAnswerRequest {
  quizId: number;
  answer: string;
  multipleAnswer: 0 | 1;
}

/** 퀴즈 답변 제출 API */
export async function submitQuizAnswer({
  quizId,
  answer,
  multipleAnswer,
}: SubmitQuizAnswerParams): Promise<void> {
  return apiClient.post<void, SubmitQuizAnswerRequest>("/quizzes/answer", {
    quizId,
    multipleAnswer,
    answer,
  });
}
