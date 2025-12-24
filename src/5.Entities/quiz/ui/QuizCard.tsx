import { cn } from "@/6.shared/lib";
import { LectureQuiz, QUIZ_TYPE, STATUS } from "../model/quiz.type";
import { getLatestSubmit } from "../lib/getLatestSubmit";
import {
  CheckCircle2,
  Circle,
  FileText,
  MessageSquareText,
  XCircle,
} from "lucide-react";
import { MultipleChoiceAnswer } from "./MultipleChoiceAnswer";
import { DescriptiveAnswer } from "./DescriptiveAnswer";

interface QuizCardProps {
  quiz: LectureQuiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const latestSubmit = getLatestSubmit(quiz.quizSubmits);
  const isCorrect = latestSubmit?.status === STATUS.정답;
  const hasFeedback = Boolean(latestSubmit?.feedbackComment);
  const isDescriptive = quiz.quizType === QUIZ_TYPE.주관식;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border overflow-hidden shadow-sm",
        isCorrect ? "border-green-200" : "border-red-200"
      )}
    >
      {/* 카드 헤더 */}
      <div
        className={cn(
          "flex items-center justify-between px-5 py-3",
          isCorrect ? "bg-green-50" : "bg-red-50"
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
          {hasFeedback && (
            <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
              <MessageSquareText className="w-3 h-3" />
              피드백
            </span>
          )}
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isCorrect ? "text-green-600" : "text-red-600"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                정답
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                오답
              </>
            )}
          </span>
        </div>
      </div>

      {/* 카드 본문 */}
      <div className="p-5">
        {/* 질문 */}
        <p className="text-gray-900 font-medium mb-5 leading-relaxed">
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
