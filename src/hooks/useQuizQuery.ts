import { useQuery } from "@tanstack/react-query";
import getSubmittedQuizList from "./lib/getSubmittedQuizList";
import getAdminSubmittedQuizList from "./lib/getAdminSubmittedQuizList";
import getAdminSubmittedDescriptiveQuizList from "./lib/getAdminSubmittedDescriptiveQuizList";
import { Quiz } from "@/model/quiz";
import getLectureQuizList from "./lib/getLectureQuizList";

interface MainQuiz {
  quizId: number;
  question: string;
  submittedAnswer: number[];
  submittedAnswersContents: string[];
  isAnswer: boolean;
  lectureTitle: string;
  courseTitle: string;
  correctAnswers: AnswerItem[];
  feedback?: string;
}

interface AnswerItem {
  itemIndex: number;
  item: string;
}

export const useFetchQuizListQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<MainQuiz[]>({
    queryKey: ["quizzes", accessToken],
    queryFn: () => getSubmittedQuizList(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchAdminQuizListQuery = (
  accessToken: string,
  userId: number,
  queryQuizType: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<MainQuiz[]>({
    queryKey: ["quizzes", queryQuizType, accessToken],
    queryFn: () =>
      getAdminSubmittedQuizList(accessToken, userId, queryQuizType),
    enabled: !!accessToken,
  });
};

export const useFetchAdminLectureQuizList = (
  accessToken: string,
  courseId: number,
  lectureId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<Quiz[]>({
    queryKey: ["lectureQuiz", accessToken],
    queryFn: () => getLectureQuizList(accessToken, courseId, lectureId),
    enabled: !!accessToken,
  });
};

// export const useFetchAdminDescriptiveQuizListQuery = (
//   accessToken: string,
//   userId: number,
//   queryQuizType: string,
//   options?: { enabled?: boolean }
// ) => {
//   return useQuery<Quiz[]>({
//     queryKey: ["quizzes", accessToken],
//     queryFn: () =>
//       getAdminSubmittedDescriptiveQuizList(accessToken, userId, queryQuizType),
//     enabled: !!accessToken,
//   });
// };
