import { apiClient } from "@/6.shared/api";

export interface DeleteAnswerResponse {
  message: string;
}

export async function deleteAnswer(
  answerId: number
): Promise<DeleteAnswerResponse> {
  return await apiClient.delete<DeleteAnswerResponse>(
    `/qna/answers`,
    undefined,
    {
      params: { answerId },
    }
  );
}
