import { cn } from "@/6.shared/lib";
import { LectureQuiz, QUIZ_TYPE, STATUS } from "../model/quiz.type";
import { getLatestSubmit } from "../lib/getLatestSubmit";
import {
  CheckCircle2,
  Circle,
  FileText,
  MessageSquareText,
  XCircle,
  Clock,
} from "lucide-react";
import { MultipleChoiceAnswer } from "./MultipleChoiceAnswer";
import { DescriptiveAnswer } from "./DescriptiveAnswer";

interface QuizCardProps {
  quiz: LectureQuiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const latestSubmit = getLatestSubmit(quiz.quizSubmits);
  const status = latestSubmit?.status;

  const isCorrect = status === STATUS.정답;
  const isIncorrect = status === STATUS.오답;
  const isPending = status === STATUS.미채점;

  const hasFeedback = Boolean(latestSubmit?.feedbackComment);
  const isDescriptive = quiz.quizType === QUIZ_TYPE.주관식;

  // 스타일 결정
  let borderColor = "border-gray-200";
  let headerBgColor = "bg-gray-50";
  let statusTextColor = "text-gray-600";

  if (isCorrect) {
    borderColor = "border-green-200";
    headerBgColor = "bg-green-50";
    statusTextColor = "text-green-600";
  } else if (isIncorrect) {
    borderColor = "border-red-200";
    headerBgColor = "bg-red-50";
    statusTextColor = "text-red-600";
  }
  // 미채점인 경우 기본 회색 스타일 유지

  return (
    <div
      className={cn(
        "bg-white rounded-xl border overflow-hidden shadow-sm",
        borderColor
      )}
    >
      {/* 카드 헤더 */}
      <div
        className={cn(
          "flex items-center justify-between px-5 py-3",
          headerBgColor
        )}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-800">Q{quiz.quizIndex}</span>
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              isDescriptive
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            )}
          >
            {isDescriptive ? (
              <>
                <FileText className="w-3 h-3" />
                주관식
              </>
            ) : (
              <>
                <Circle className="w-3 h-3" />
                객관식
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 제출 횟수 표시 */}
          <span className="mr-1 text-xs font-medium text-gray-500">
            {quiz.quizSubmits.length}회 제출
          </span>

          {hasFeedback && (
            <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
              <MessageSquareText className="w-3 h-3" />
              피드백
            </span>
          )}
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              statusTextColor
            )}
          >
            {isCorrect && (
              <>
                <CheckCircle2 className="w-4 h-4" />
                정답
              </>
            )}
            {isIncorrect && (
              <>
                <XCircle className="w-4 h-4" />
                오답
              </>
            )}
            {isPending && (
              <>
                <Clock className="w-4 h-4" />
                미채점
              </>
            )}
          </span>
        </div>
      </div>

      {/* 카드 본문 */}
      <div className="p-5">
        {/* 질문 */}
        <p className="mb-5 font-medium leading-relaxed text-gray-900">
          {quiz.question}
        </p>

        {quiz.quizType === QUIZ_TYPE.객관식 ? (
          <MultipleChoiceAnswer quiz={quiz} />
        ) : (
          <DescriptiveAnswer quiz={quiz} />
        )}
      </div>
    </div>
  );
};

export { QuizCard };
export type { QuizCardProps };
