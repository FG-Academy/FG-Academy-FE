import { useQuery } from "@tanstack/react-query";
import getSubmittedQuizList from "./lib/getSubmittedQuizList";
import getAdminSubmittedQuizList from "./lib/getAdminSubmittedQuizList";
import getLectureQuizList from "./lib/getLectureQuizList";
import getAdminSubmittedQuiz from "./lib/getAdminSubmittedQuiz";

interface Course {
  courseId: number;
  thumbnailImagePath: string;
  title: string;
  level: string;
  description: string;
  curriculum: string;
  openDate: string;
  finishDate: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Lecture {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
}

interface User {
  userId: number;
  birthDate: string;
  name: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  departmentName: string;
  position: string;
  yearsOfService: number;
  level: string;
  nameBirthId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  quizId: number;
  quizType: string;
  quizIndex: number;
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lecture: Lecture;
}

export interface AdminSubmittedQuiz {
  id: number;
  userId: number;
  multipleAnswer: number;
  answer: string;
  submittedAnswer: string | null;
  feedbackComment: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  quiz: Quiz;
}

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

export const useAdminSubmittedQuizListQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<AdminSubmittedQuiz[]>({
    queryKey: ["amdinQuizzes"],
    queryFn: () => getAdminSubmittedQuiz(accessToken),
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
    queryKey: ["lectureQuiz", lectureId],
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
