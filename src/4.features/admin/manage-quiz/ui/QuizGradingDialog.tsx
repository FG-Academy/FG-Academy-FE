"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
import { Checkbox } from "@/6.shared/ui/shadcn/ui/checkbox";
import { Label } from "@/6.shared/ui/shadcn/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/6.shared/ui/shadcn/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import { useQuizFeedbackMutation } from "../api/quiz-feedback.mutation";
import { useQuizGradingDialogStore } from "../model/quiz-grading-dialog.store";

export function QuizGradingDialog() {
  const { userId, quizId } = useQuizGradingDialogStore();

  const { data: descriptiveQuiz, isLoading } = useQuery(
    adminQuizQueries.descriptiveDetail(userId, quizId)
  );

  const { mutate } = useQuizFeedbackMutation();

  const [isCorrected, setIsCorrected] = useState<boolean>(false);
  const [feedbackValue, setFeedbackValue] = useState<string>("");
  const [isReGrading, setIsReGrading] = useState<boolean>(false);

  useEffect(() => {
    setIsReGrading(false);
    if (descriptiveQuiz) {
      setIsCorrected(descriptiveQuiz.status === 1);
      setFeedbackValue(descriptiveQuiz.feedbackComment ?? "");
    }
  }, [descriptiveQuiz]);

  if (isLoading || !descriptiveQuiz) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const isGraded = descriptiveQuiz.status !== 0;
  const isDisabled = isGraded && !isReGrading;

  const handleSubmit = () => {
    mutate({
      userId,
      quizId: descriptiveQuiz.quiz.quizId,
      feedbackComment: feedbackValue,
      corrected: isCorrected,
    });
    setIsReGrading(false);
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "미채점";
      case 1:
        return "정답";
      case 2:
        return "오답";
      default:
        return "알 수 없음";
    }
  };

  return (
    <AlertDialog>
      <div className="flex flex-col justify-center w-full h-full p-2 space-y-6 overflow-y-auto border">
        {/* Quiz Info */}
        <div>
          <div className="text-xs text-muted-foreground">
            {`${descriptiveQuiz.quiz.lecture.course.title} > ${descriptiveQuiz.quiz.lecture.title}`}
          </div>
          <div className="text-lg font-bold">
            문제: {descriptiveQuiz.quiz.question}
          </div>
        </div>

        {/* Grading Status */}
        <div>
          주관식 퀴즈 채점 현황:{" "}
          <span className="font-medium">
            {getStatusLabel(descriptiveQuiz.status)}
          </span>
        </div>

        {/* Multiple Choice Display */}
        {descriptiveQuiz.multipleAnswer === 1 ? (
          <div>
            {descriptiveQuiz.quiz.quizAnswers.map((answer) => (
              <div
                className="flex flex-row gap-2 items-center p-2"
                key={answer.id}
              >
                <Checkbox
                  className="items-center"
                  disabled
                  checked={JSON.parse(descriptiveQuiz.answer).includes(
                    answer.itemIndex
                  )}
                />
                <span className="font-medium">{answer.item}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Descriptive Answer with Feedback */
          <>
            {/* Submitted Answer */}
            <div>
              <div className="text-sm font-medium">제출한 답변</div>
              <div className="p-4 border rounded-md bg-muted/30">
                {descriptiveQuiz.answer}
              </div>
            </div>

            {/* Feedback Input */}
            <div>
              <div className="text-sm font-medium mb-2">피드백 내용</div>
              <Textarea
                disabled={isDisabled}
                value={feedbackValue}
                placeholder="피드백을 남겨주세요..."
                onChange={(e) => setFeedbackValue(e.target.value)}
              />
              <div className="flex flex-row mt-2 space-x-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Checkbox
                    disabled={isDisabled}
                    id="correct"
                    onCheckedChange={() => setIsCorrected(true)}
                    checked={isCorrected}
                  />
                  <Label htmlFor="correct">정답</Label>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Checkbox
                    disabled={isDisabled}
                    id="incorrect"
                    onCheckedChange={() => setIsCorrected(false)}
                    checked={!isCorrected}
                  />
                  <Label htmlFor="incorrect">오답</Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <AlertDialogTrigger asChild>
              <Button disabled={isDisabled} type="submit">
                피드백 남기기
              </Button>
            </AlertDialogTrigger>
            <Button
              disabled={!isGraded || isReGrading}
              variant="secondary"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setIsReGrading(true)}
            >
              피드백 다시 하기
            </Button>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>피드백을 제출하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            제출한 피드백은 수정할 수 없습니다. <br />
            정답이 올바른지 한번 더 확인해주세요. <br />
            정말 채점을 완료하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
