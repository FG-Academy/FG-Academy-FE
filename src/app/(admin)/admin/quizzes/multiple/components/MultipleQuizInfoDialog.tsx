"use client";

import QuizDetailContents from "@/app/(home)/myDashboard/components/QuizDetailContents";
import { useFetchAdminQuizListQuery } from "@/hooks/useQuizQuery";
import useOpenMultipleDialogStore from "@/store/useOpenMultipleDialogStore";
import { useSession } from "next-auth/react";
import QuizContents from "./QuizContents";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import {
  useMyCoursesQuery,
  useMyCoursesQuizQuery,
} from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/hooks/useMyCoursesQuery";
import { Course } from "@/model/course";

export default function MultipleQuizInfoDialog() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { userId } = useOpenMultipleDialogStore((state) => state);

  const { data: courses } = useMyCoursesQuizQuery(accessToken, userId);

  if (!courses) {
    return <Loading />;
  }

  return (
    <div className="flex w-full h-full items-center flex-col space-y-2">
      {courses.length > 0 ? (
        courses.map((course: Course, index) => {
          const totalQuizzes = course.lectures.reduce((acc, lecture) => {
            return (
              acc +
              lecture.quizzes.filter((quiz) => quiz.quizType === "multiple")
                .length
            );
          }, 0);
          const submittedQuizzes = course.lectures.reduce((acc, lecture) => {
            return (
              acc +
              lecture.quizzes.reduce((quizAcc, quiz) => {
                return quiz.quizType === "multiple"
                  ? quizAcc + (quiz.quizSubmits.length > 0 ? 1 : 0)
                  : quizAcc;
              }, 0)
            );
          }, 0);
          const correctAnswers = course.lectures.reduce((acc, lecture) => {
            return (
              acc +
              lecture.quizzes.reduce((quizAcc, quiz) => {
                return quiz.quizType === "multiple"
                  ? quizAcc +
                      quiz.quizSubmits.reduce((submitAcc, submit) => {
                        return submitAcc + (submit.status === 1 ? 1 : 0);
                      }, 0)
                  : quizAcc;
              }, 0)
            );
          }, 0);
          const answerRate =
            submittedQuizzes > 0
              ? Math.round((correctAnswers / submittedQuizzes) * 100)
              : 0;

          return (
            <div key={course.courseId} className="w-full p-4 overflow-y-auto">
              <QuizContents
                course={course}
                submittedQuizzes={submittedQuizzes}
                totalQuizzes={totalQuizzes}
                answerRate={answerRate}
              />
            </div>
          );
        })
      ) : (
        <div>제출한 퀴즈가 없습니다.</div>
      )}
    </div>
  );
}
