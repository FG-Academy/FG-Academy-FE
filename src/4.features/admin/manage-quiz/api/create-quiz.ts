import { apiClient } from "@/6.shared/api";
import type { AdminQuizFormRequest } from "@/5.entities/admin/quiz";

interface CreateQuizParams {
  lectureId: number;
  data: AdminQuizFormRequest;
}

/** Create a new quiz for a lecture */
export async function createQuiz({
  lectureId,
  data,
}: CreateQuizParams): Promise<void> {
  return apiClient.post(`/admin/quizzes/register/${lectureId}`, data);
}
