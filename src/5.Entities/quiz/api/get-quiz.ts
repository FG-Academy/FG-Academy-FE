import { apiClient } from "@/6.shared/api";
import type { QuizWithDetails } from "../model/quiz.type";

/** 강의별 퀴즈 목록 조회 */
export async function getQuizzesByLecture(
  lectureId: number
): Promise<QuizWithDetails[]> {
  return apiClient.get<QuizWithDetails[]>(`/quizzes/lectures/${lectureId}`);
}

/** 단일 퀴즈 조회 */
export async function getQuizById(quizId: number): Promise<QuizWithDetails> {
  return apiClient.get<QuizWithDetails>(`/quizzes/${quizId}`);
}
