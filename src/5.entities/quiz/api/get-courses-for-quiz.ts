import { apiClient } from "@/6.shared/api";
import { CourseForQuiz } from "../model/quiz.type";

export const getCoursesForQuiz = async () => {
  const data = await apiClient.get<CourseForQuiz[]>("/quizzes/me/courses");
  return data;
};
