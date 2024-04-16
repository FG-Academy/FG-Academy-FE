import { useQuery } from "@tanstack/react-query";
import getSubmittedQuizList from "./lib/getSubmittedQuizList";

interface Quiz {
  quizId: number;
  question: string;
  submittedAnswer: number[];
  submittedAnswersContents: string[];
  isAnswer: boolean;
  lectureTitle: string;
  courseTitle: string;
  correctAnswers: AnswerItem[];
}

interface AnswerItem {
  itemIndex: number;
  item: string;
}

export const useFetchQuizListQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", accessToken],
    queryFn: () => getSubmittedQuizList(accessToken),
    enabled: !!accessToken,
  });
};
