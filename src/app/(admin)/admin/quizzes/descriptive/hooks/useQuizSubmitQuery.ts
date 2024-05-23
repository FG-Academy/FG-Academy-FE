import { useQuery } from "@tanstack/react-query";
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

export const useQuizSubmitQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<QuizSubmitResponse[]>({
    queryKey: ["quizSubmits"],
    queryFn: () => getQuizSubmit(accessToken),
    enabled: !!accessToken,
  });
};

export const useAllQuizSubmitQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<QuizSubmitResponse[]>({
    queryKey: ["quizSubmits"],
    queryFn: () => getAllQuizSubmit(accessToken),
    enabled: !!accessToken,
  });
};
