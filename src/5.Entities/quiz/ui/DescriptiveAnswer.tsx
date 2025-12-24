import { MessageSquareText } from "lucide-react";
import { LectureQuiz, STATUS } from "../model/quiz.type";
import { getLatestSubmit } from "../lib/getLatestSubmit";

interface DescriptiveAnswerProps {
  quiz: LectureQuiz;
}

const DescriptiveAnswer = ({ quiz }: DescriptiveAnswerProps) => {
  const submit = getLatestSubmit(quiz.quizSubmits);

  if (!submit) return null;

  return (
    <div className="space-y-4">
      {/* 나의 답안 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
          <div className="w-1 h-4 bg-blue-500 rounded-full" />
          나의 답안
        </h4>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {submit.answer}
          </p>
        </div>
      </div>

      {/* 강사 피드백 */}
      {submit.feedbackComment && (
        <div>
          <h4 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-1.5">
            <MessageSquareText className="w-4 h-4" />
            강사 피드백
          </h4>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {submit.feedbackComment}
            </p>
          </div>
        </div>
      )}

      {/* 피드백 대기 중 */}
      {!submit.feedbackComment && submit.status === STATUS.미채점 && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          강사의 피드백을 기다리고 있습니다
        </div>
      )}
    </div>
  );
};

export { DescriptiveAnswer };
export type { DescriptiveAnswerProps };
