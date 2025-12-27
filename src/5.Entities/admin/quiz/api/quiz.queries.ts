import { queryOptions } from "@tanstack/react-query";
import { getAdminQuizSubmissions } from "./get-quiz-submissions";
import { getAdminDescriptiveQuiz } from "./get-descriptive-quiz";
import { getAdminLectureQuizzes } from "./get-lecture-quizzes";
import { getAdminCourseLectures } from "./get-course-lectures";
import type { AdminQuizFilter } from "../model/quiz.types";

export const adminQuizQueries = {
  all: () => ["adminQuizzes"] as const,

  /** Quiz submissions list (for grading page) */
  submissions: (
    pagination: { pageIndex: number; pageSize: number },
    filters: AdminQuizFilter,
    sortBy: string,
    userDepartment: string,
    userLevel: string
  ) =>
    queryOptions({
      queryKey: [
        ...adminQuizQueries.all(),
        "submissions",
        pagination,
        filters,
        sortBy,
        userDepartment,
        userLevel,
      ],
      queryFn: () =>
        getAdminQuizSubmissions(
          pagination,
          filters,
          sortBy,
          userDepartment,
          userLevel
        ),
    }),

  /** Descriptive quiz detail (for grading dialog) */
  descriptiveDetail: (userId: number, quizId: number) =>
    queryOptions({
      queryKey: [...adminQuizQueries.all(), "descriptive", userId, quizId],
      queryFn: () => getAdminDescriptiveQuiz(userId, quizId),
      enabled: !!userId && !!quizId,
    }),

  /** Lecture quizzes (for quiz registration) */
  lectureQuizzes: (lectureId: number) =>
    queryOptions({
      queryKey: [...adminQuizQueries.all(), "lecture", lectureId],
      queryFn: () => getAdminLectureQuizzes(lectureId),
      enabled: !!lectureId,
    }),

  /** Course lectures (for quiz registration page) */
  courseLectures: (courseId: number | null) =>
    queryOptions({
      queryKey: ["lectures", courseId],
      queryFn: () => getAdminCourseLectures(courseId!),
      enabled: !!courseId,
    }),
};
