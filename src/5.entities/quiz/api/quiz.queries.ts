import { queryOptions } from "@tanstack/react-query";
import { getMyQuizzes } from "./get-my-quizzes";
import { getCoursesForQuiz } from "./get-courses-for-quiz";
import { getQuizById, getQuizzesByLecture } from "./get-quiz";
import type { QuizWithDetails } from "../model/quiz.type";

export const quizQueries = {
  all: () => ["quiz"],
  lists: () => [...quizQueries.all(), "list"],

  myQuizzes: (courseId: number) =>
    queryOptions({
      queryKey: [...quizQueries.all(), courseId, "myQuiz"],
      queryFn: () => getMyQuizzes(courseId),
    }),

  coursesForQuiz: () =>
    queryOptions({
      queryKey: [...quizQueries.all(), "coursesForQuiz"],
      queryFn: () => getCoursesForQuiz(),
    }),

  /** 강의별 퀴즈 목록 조회 */
  byLecture: (lectureId: number) =>
    queryOptions<QuizWithDetails[]>({
      queryKey: ["quizzes", "byLecture", lectureId],
      queryFn: () => getQuizzesByLecture(lectureId),
    }),

  /** 단일 퀴즈 조회 */
  detail: (quizId: number) =>
    queryOptions<QuizWithDetails>({
      queryKey: ["quizzes", "detail", quizId],
      queryFn: () => getQuizById(quizId),
    }),
};
