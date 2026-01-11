import { cn } from "@/6.shared/lib";
import { LectureQuiz } from "../model/quiz.type";
import { getLatestSubmit } from "../lib/getLatestSubmit";

interface MultipleChoiceAnswerProps {
  quiz: LectureQuiz;
}

const MultipleChoiceAnswer = ({ quiz }: MultipleChoiceAnswerProps) => {
  const latestSubmit = getLatestSubmit(quiz.quizSubmits);
  if (!latestSubmit) return null;

  const userAnswerIndex = JSON.parse(latestSubmit.answer)[0];
  const correctAnswerIndex =
    quiz.quizAnswers.find((a) => a.isAnswer === 1)?.itemIndex ?? 0;

  return (
    <div className="space-y-2">
      {quiz.quizAnswers.map((answer) => {
        const isUserAnswer = userAnswerIndex === answer.itemIndex;
        const isCorrectAnswer = correctAnswerIndex === answer.itemIndex;

        return (
          <div
            key={answer.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border-2 transition-colors",
              isCorrectAnswer
                ? "border-green-400 bg-green-50"
                : isUserAnswer && !isCorrectAnswer
                ? "border-red-400 bg-red-50"
                : "border-gray-100 bg-gray-50"
            )}
          >
            {/* 번호 원 */}
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                isCorrectAnswer
                  ? "bg-green-500 text-white"
                  : isUserAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {answer.itemIndex}
            </div>

            {/* 답안 텍스트 */}
            <span
              className={cn(
                "flex-1",
                isCorrectAnswer
                  ? "text-green-700 font-medium"
                  : isUserAnswer
                  ? "text-red-700"
                  : "text-gray-600"
              )}
            >
              {answer.item}
            </span>

            {/* 라벨 */}
            {isUserAnswer && !isCorrectAnswer && (
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                내 선택
              </span>
            )}
            {isCorrectAnswer && (
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                정답
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { MultipleChoiceAnswer };
export type { MultipleChoiceAnswerProps };
