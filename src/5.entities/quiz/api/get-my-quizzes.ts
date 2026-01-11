import { apiClient } from "@/6.shared/api";
import { MyQuizResponse } from "../model/quiz.type";

export const getMyQuizzes = async (courseId: number) => {
  const data = await apiClient.get<MyQuizResponse>(
    `/quizzes/me/courses/${courseId}`
  );
  return data;
};
