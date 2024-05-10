import { User } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import { getQuizSubmit } from "../lib/getQuizSubmit";

interface Quiz {
  quizId: number;
  quizType: string;
  quizIndex: number;
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lecture: Lecture;
}

interface Lecture {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
}

interface Course {
  courseId: number;
  title: string;
  thumbnailImagePath: string;
  description: string;
  curriculum: string;
  status: string;
  level: string;
  openDate: string;
  finishDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizSubmitResponse {
  id: number;
  name: string;
  userId: number;
  quizId: number;
  position: string;
  departmentName: string;
  lectureTitle: string;
  courseTitle: string;
  status: number;
  user: User;
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
