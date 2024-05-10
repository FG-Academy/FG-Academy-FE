import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../lib/getMyCourses";
import { Course } from "@/model/course";
import { getMyCoursesQuiz } from "../lib/getMyCoursesQuiz";
import { getMyDescriptiveQuiz } from "../lib/getMyDescriptiveQuiz";
import { User } from "@/model/user";
import { Quiz } from "@/hooks/useQuizQuery";

interface DescriptiveQuizResponse {
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

export const useMyCoursesQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<Course>({
    queryKey: ["myCourse", courseId],
    queryFn: () => getMyCourses(courseId, accessToken),
    enabled: !!accessToken,
  });
};

export const useMyCoursesQuizQuery = (
  accessToken: string,
  userId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<Course[]>({
    queryKey: ["myCourses", userId],
    queryFn: () => getMyCoursesQuiz(accessToken, userId),
    enabled: !!accessToken,
  });
};

export const useMyDescriptiveQuizQuery = (
  accessToken: string,
  userId: number,
  quizId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<DescriptiveQuizResponse>({
    queryKey: ["quizzes", quizId, userId],
    queryFn: () => getMyDescriptiveQuiz(accessToken, userId, quizId),
    enabled: !!accessToken,
  });
};
