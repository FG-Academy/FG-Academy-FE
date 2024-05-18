import { useQuery } from "@tanstack/react-query";
import getDashboardQuizList from "../lib/getDashboardQuizList";
import { IQuizAnswer } from "@/model/quiz";

export interface DashboardQuizResponse {
  quizId: number;
  question: string;
  answer: string;
  multipleAnswer: number;
  isAnswer: number;
  lectureTitle: string;
  courseTitle: string;
  feedback: string | null;
  quizAnswers: IQuizAnswer[];
}

/** [내 강의실] 제출한 퀴즈 가져오기 */
export const useFetchDashboardQuizzesQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<DashboardQuizResponse[]>({
    queryKey: ["quizzes", "dashboard", accessToken],
    queryFn: () => getDashboardQuizList(accessToken),
    enabled: !!accessToken,
  });
};
