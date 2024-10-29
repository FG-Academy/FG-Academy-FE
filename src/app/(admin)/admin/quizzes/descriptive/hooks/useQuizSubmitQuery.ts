import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getQuizSubmit } from "../lib/getQuizSubmit";
import { IUser } from "@/model/user";
import { IQuiz } from "@/model/quiz";
import { ILecture } from "@/model/lecture";
import { ICourse } from "@/model/course";
import { getAllQuizSubmit } from "../lib/getAllQuizSubmit";

interface Quiz extends IQuiz {
  lecture: Lecture;
}

interface Lecture extends ILecture {
  course: ICourse;
}

export interface QuizFilter {
  name: string;
  position: string;
  departmentName: string;
  courseTitle: string;
  quizType: string;
  answerStatus: string;
}

export interface QuizSubmitResponse {
  id: number;
  name: string;
  userId: number;
  quizId: number;
  quizType: string;
  position: string;
  departmentName: string;
  departmentLabel: string;
  positionLabel: string;
  lectureTitle: string;
  courseTitle: string;
  answerType: string;
  status: number;
  user: IUser;
  quiz: Quiz;
}

interface Result {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: QuizSubmitResponse[];
}

interface ApiResponse {
  result: Result;
}

export const useQuizSubmitQuery = (
  accessToken: string,
  pagination: { pageIndex: number; pageSize: number },
  filters: QuizFilter,
  sortBy: string,
  userDepartment: string,
  userLevel: string,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<ApiResponse>({
    queryKey: ["quizSubmits", pagination, filters, sortBy],
    queryFn: () =>
      getQuizSubmit(
        accessToken,
        pagination,
        filters,
        sortBy,
        userDepartment,
        userLevel
      ),
    enabled: !!accessToken,
    placeholderData: keepPreviousData,
  });
};

// export const useAllQuizSubmitQuery = (
//   accessToken: string,
//   options?: { enabled?: boolean }
// ) => {
//   return useQuery<QuizSubmitResponse[]>({
//     queryKey: ["quizSubmits"],
//     queryFn: () => getAllQuizSubmit(accessToken),
//     enabled: !!accessToken,
//   });
// };
