import { useQuery } from "@tanstack/react-query";
import { getOneQuiz, getQuiz } from "../lib/getQuiz";
import { IQuiz, IQuizAnswer, IQuizSubmit } from "@/model/quiz";

interface Quiz extends IQuiz {
  quizAnswers: IQuizAnswer[];
  quizSubmits: IQuizSubmit[];
}

/** [강의 수강 화면 - 퀴즈] 한 영상에 달린 퀴즈 가져오기 */
export const useQuizQuery = (
  lectureId: number,
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", lectureId, accessToken],
    queryFn: () => getQuiz(lectureId, accessToken),
    enabled: !!accessToken,
  });
};

export const useOneQuizQuery = (
  quizId: number,
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Quiz>({
    queryKey: ["quizzes", quizId, accessToken],
    queryFn: () => getOneQuiz(quizId, accessToken),
    enabled: !!accessToken,
  });
};
