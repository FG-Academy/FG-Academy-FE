import { QuizSubmit } from "../model/quiz.type";

export type QuizSubmitPick = Pick<
  QuizSubmit,
  | "multipleAnswer"
  | "answer"
  | "feedbackComment"
  | "status"
  | "createdAt"
  | "updatedAt"
>;

/**
 * quizSubmits 배열에서 가장 최근 제출을 반환합니다.
 * createdAt 기준으로 가장 최근 제출을 찾습니다.
 */
export const getLatestSubmit = (
  quizSubmits: QuizSubmitPick[]
): QuizSubmitPick | null => {
  if (!quizSubmits.length) return null;

  return quizSubmits.reduce((latest, current) => {
    const latestDate = new Date(latest.createdAt).getTime();
    const currentDate = new Date(current.createdAt).getTime();
    return currentDate > latestDate ? current : latest;
  });
};
