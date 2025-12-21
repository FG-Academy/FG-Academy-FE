import { queryOptions } from "@tanstack/react-query";
import { getMyQuizzes } from "./get-my-quizzes";
import { getCoursesForQuiz } from "./get-courses-for-quiz";

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
};
