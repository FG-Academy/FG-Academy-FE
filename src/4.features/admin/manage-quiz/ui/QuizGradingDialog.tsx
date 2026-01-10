"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
import { Label } from "@/6.shared/ui/shadcn/ui/label";
import { Badge } from "@/6.shared/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/6.shared/ui/shadcn/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/6.shared/ui/shadcn/ui/radio-group";
import { Separator } from "@/6.shared/ui/shadcn/ui/separator";
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
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import { useQuizFeedbackMutation } from "../api/quiz-feedback.mutation";
import { useQuizGradingDialogStore } from "../model/quiz-grading-dialog.store";
import { cn } from "@/6.shared/lib";

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
      <div className="flex flex-col items-center justify-center w-full h-[400px] text-muted-foreground gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm">퀴즈 정보를 불러오는 중입니다...</p>
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

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Badge
            variant="secondary"
            className="bg-slate-200 text-slate-700 hover:bg-slate-200"
          >
            미채점
          </Badge>
        );
      case 1:
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-600">
            정답
          </Badge>
        );
      case 2:
        return <Badge variant="destructive">오답</Badge>;
      default:
        return <Badge variant="outline">알 수 없음</Badge>;
    }
  };

  return (
    <AlertDialog>
      <div className="flex flex-col w-full h-full max-h-[85vh] bg-background">
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="font-medium text-primary">
                {descriptiveQuiz.quiz.lecture.course.title}
              </span>
              <span>/</span>
              <span>{descriptiveQuiz.quiz.lecture.title}</span>
              {getStatusBadge(descriptiveQuiz.status)}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold leading-tight tracking-tight">
              Q. {descriptiveQuiz.quiz.question}
            </h2>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col p-6 space-y-6">
          {descriptiveQuiz.multipleAnswer === 1 ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  선택지 및 제출 답안
                  <div className="flex items-center gap-3 text-xs font-normal">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-500 rounded-full" />
                      유저 선택
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-green-500 rounded-full" />
                      정답
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {descriptiveQuiz.quiz.quizAnswers.map((answer) => {
                  const userSelectedAnswers = JSON.parse(
                    descriptiveQuiz.answer
                  ) as number[];
                  const isUserSelected = userSelectedAnswers.includes(
                    answer.itemIndex
                  );
                  const isCorrectAnswer = answer.isAnswer;
                  const isCorrectSelection = isUserSelected && isCorrectAnswer;
                  const isWrongSelection = isUserSelected && !isCorrectAnswer;
                  const isMissedAnswer = !isUserSelected && isCorrectAnswer;

                  return (
                    <div
                      key={answer.id}
                      className={cn(
                        "flex items-center p-3 rounded-md border-2 transition-colors relative",
                        isCorrectSelection &&
                          "bg-green-50 border-green-500 text-green-700",
                        isWrongSelection &&
                          "bg-red-50 border-red-500 text-red-700",
                        isMissedAnswer &&
                          "bg-amber-50 border-amber-400 text-amber-700",
                        !isUserSelected &&
                          !isCorrectAnswer &&
                          "bg-card border-input text-muted-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-5 h-5 mr-3 rounded border-2 shrink-0",
                          isUserSelected
                            ? isCorrectAnswer
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-red-500 border-red-500 text-white"
                            : isCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {isUserSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        {!isUserSelected && isCorrectAnswer && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        )}
                      </div>
                      <span className="flex-1">{answer.item}</span>
                      <div className="flex items-center gap-2 ml-2">
                        {isUserSelected && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] px-1.5 py-0.5",
                              isCorrectAnswer
                                ? "border-green-500 text-green-600 bg-green-50"
                                : "border-red-500 text-red-600 bg-red-50"
                            )}
                          >
                            유저 선택
                          </Badge>
                        )}
                        {isCorrectAnswer && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0.5 border-green-500 text-green-600 bg-green-50"
                          >
                            정답
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-blue-500/50">
                <CardHeader className="pb-2 bg-muted/10">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    학생이 제출한 답변
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {descriptiveQuiz.answer}
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "transition-all duration-200",
                  !isDisabled ? "border-primary/50 shadow-sm" : "opacity-80"
                )}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    채점 및 피드백
                    {!isDisabled && (
                      <span className="px-2 py-1 text-xs font-normal rounded text-muted-foreground bg-muted">
                        작성 중
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">
                      채점 결과
                    </Label>
                    <RadioGroup
                      disabled={isDisabled}
                      value={isCorrected ? "correct" : "incorrect"}
                      onValueChange={(val) => setIsCorrected(val === "correct")}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="correct"
                          id="correct"
                          className="sr-only peer"
                        />
                        <Label
                          htmlFor="correct"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-700 cursor-pointer transition-all"
                        >
                          <CheckCircle2 className="w-6 h-6 mb-2" />
                          <span className="font-semibold">정답</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="incorrect"
                          id="incorrect"
                          className="sr-only peer"
                        />
                        <Label
                          htmlFor="incorrect"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 peer-data-[state=checked]:text-red-700 cursor-pointer transition-all"
                        >
                          <XCircle className="w-6 h-6 mb-2" />
                          <span className="font-semibold">오답</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">
                      피드백 (선택)
                    </Label>
                    <Textarea
                      disabled={isDisabled}
                      value={feedbackValue}
                      placeholder="학생에게 전달할 피드백이나 오답에 대한 설명을 작성해주세요."
                      className="min-h-[120px] resize-none focus-visible:ring-primary/20"
                      onChange={(e) => setFeedbackValue(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {descriptiveQuiz.multipleAnswer !== 1 && (
          <div className="flex-none p-6 pt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t mt-auto">
            <div className="flex justify-end gap-3">
              {isGraded && !isReGrading ? (
                <Button
                  variant="outline"
                  onClick={() => setIsReGrading(true)}
                  className="w-full transition-colors sm:w-auto border-primary/20 hover:bg-primary/5 hover:text-primary"
                >
                  수정하기
                </Button>
              ) : (
                <div className="flex w-full gap-3 sm:w-auto">
                  {isReGrading && (
                    <Button
                      variant="ghost"
                      onClick={() => setIsReGrading(false)}
                      className="flex-1 sm:flex-none"
                    >
                      취소
                    </Button>
                  )}
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={isDisabled}
                      type="submit"
                      className="flex-1 sm:flex-none min-w-[120px]"
                    >
                      {isReGrading ? "수정 완료" : "채점 완료"}
                    </Button>
                  </AlertDialogTrigger>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            채점을 완료하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            {isCorrected ? (
              <span className="block mb-2 font-medium text-green-600">
                ● 정답 처리
              </span>
            ) : (
              <span className="block mb-2 font-medium text-red-600">
                ● 오답 처리
              </span>
            )}
            제출 후에는 학생에게 피드백이 전송됩니다.
            <br />
            입력하신 내용이 정확한지 다시 한 번 확인해주세요.
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
