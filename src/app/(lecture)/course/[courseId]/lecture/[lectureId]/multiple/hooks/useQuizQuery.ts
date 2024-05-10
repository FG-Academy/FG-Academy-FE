import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "../../lib/getQuiz";
import { Quiz } from "@/model/quiz";

export const useQuizQuery = (
  courseId: number,
  lectureId: number,
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", courseId, lectureId],
    queryFn: () => getQuiz(courseId, lectureId, accessToken),
    enabled: !!accessToken,
  });
};
