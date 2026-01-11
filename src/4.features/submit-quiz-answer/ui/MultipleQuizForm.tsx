"use client";

import { Card, CardContent, CardHeader, Checkbox, Button } from "@/6.shared/ui";
import { Loading } from "@/6.shared/ui";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { quizQueries, type QuizWithDetails } from "@/5.entities/quiz";
import {
  MultipleAnswerSchema,
  type MultipleAnswerFormValues,
} from "../model/multiple-answer.schema";
import { useSubmitMultipleMutation } from "../api/use-submit-multiple-mutation";
import { cn } from "@/6.shared/lib";
import { Check, XCircle, AlertCircle, RotateCcw } from "lucide-react";

export function MultipleQuizForm() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [retry, setRetry] = useState(false);
  const [isMultipleAnswers, setMultipleAnswers] = useState(false);

  const searchParams = useSearchParams();
  const currentQuizId = parseInt(searchParams.get("quizId") as string);

  const { data: quiz } = useQuery<QuizWithDetails>(
    quizQueries.detail(currentQuizId)
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MultipleAnswerFormValues>({
    resolver: zodResolver(MultipleAnswerSchema),
  });

  const { mutate, isPending } = useSubmitMultipleMutation({
    quizId: currentQuizId,
  });

  useEffect(() => {
    setValue("items", selectedAnswers);
  }, [selectedAnswers, setValue]);

  useEffect(() => {
    setValue("items", []);
    setSelectedAnswers([]);
  }, [currentQuizId, setValue]);

  useEffect(() => {
    if (quiz && quiz.quizAnswers.filter((qA) => qA.isAnswer).length > 1) {
      setMultipleAnswers(true);
    }
  }, [quiz]);

  if (!quiz) {
    return <Loading />;
  }

  const handleAnswerSelection = (itemIndex: number) => {
    if (isMultipleAnswers) {
      setSelectedAnswers((prev) =>
        prev.includes(itemIndex)
          ? prev.filter((index) => index !== itemIndex)
          : [...prev, itemIndex]
      );
    } else {
      setSelectedAnswers([itemIndex]);
    }
  };

  const onSubmit = async (data: MultipleAnswerFormValues) => {
    mutate(data, {
      onSuccess: () => {
        setRetry(false);
      },
    });
  };

  const hasPassed = quiz.quizSubmits.some((submit) => submit.status === 1);
  const remainingAttempts = 3 - quiz.quizSubmits.length;

  return (
    <div className="max-w-3xl px-4 pb-20 mx-auto my-12">
      <div className="mb-10 space-y-4 text-center">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 rounded-full bg-blue-50">
          {quiz.quizType === "multiple" ? "객관식 퀴즈" : "설문"}
        </span>
        <h1 className="text-2xl font-bold md:text-3xl text-zinc-900">
          꼼꼼 Check!
        </h1>
        <p className="text-zinc-500">헷갈리는 부분이 없는지 확인해보아요.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {quiz.quizSubmits.length > 0 && !retry ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900">제출 현황</h2>
              <span className="text-sm text-zinc-500">
                총 3회 중 {quiz.quizSubmits.length}회 제출
              </span>
            </div>

            {quiz.quizSubmits.map((submit, index) => {
              const isCorrect = submit.status === 1;
              const submittedAnswers = JSON.parse(submit.answer) as number[];

              return (
                <Card
                  key={submit.id}
                  className={cn(
                    "overflow-hidden border-l-4 shadow-sm transition-all",
                    isCorrect
                      ? "border-l-emerald-500 bg-emerald-50/10"
                      : "border-l-red-500 bg-red-50/10"
                  )}
                >
                  <CardHeader className="pb-3 border-b border-zinc-100/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-700">
                          #{index + 1}번째 시도
                        </span>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <Check className="w-3.5 h-3.5" /> 정답
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> 오답
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-lg font-medium text-zinc-800">
                      Q. {quiz.question}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {quiz.quizAnswers.map((answer) => {
                      const isChecked = submittedAnswers.includes(
                        answer.itemIndex
                      );
                      return (
                        <div
                          key={answer.id}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-lg border",
                            isChecked
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-200"
                                : "bg-red-50 border-red-200"
                              : "bg-white border-zinc-100 opacity-70"
                          )}
                        >
                          <Checkbox
                            disabled
                            checked={isChecked}
                            className={cn(
                              isChecked &&
                                !isCorrect &&
                                "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                            )}
                          />
                          <span
                            className={cn(
                              "font-medium",
                              isChecked ? "text-zinc-900" : "text-zinc-500"
                            )}
                          >
                            {answer.item}
                          </span>
                        </div>
                      );
                    })}

                    {!isCorrect && (
                      <div className="flex items-center gap-2 mt-2 text-sm font-medium text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>오답입니다. 다시 확인해보세요!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            <div className="pt-6">
              <Button
                type="button"
                disabled={quiz.quizSubmits.length >= 3 || hasPassed}
                onClick={() => setRetry(true)}
                className={cn(
                  "w-full h-12 text-base font-bold shadow-md transition-all",
                  hasPassed
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                {hasPassed ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> 학습 완료
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    다시 풀기 (남은 기회 {remainingAttempts}회)
                  </span>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Card className="overflow-hidden bg-white border shadow-lg border-zinc-200">
            <CardHeader className="p-6 border-b bg-zinc-50 border-zinc-100 md:p-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-400">
                    Question
                  </span>
                  {isMultipleAnswers && (
                    <span className="px-2 py-1 text-xs font-bold text-blue-600 rounded bg-blue-50">
                      복수 선택 가능
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold leading-snug md:text-2xl text-zinc-800">
                  {quiz.question}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4 md:p-8">
              {quiz.quizAnswers.map((answer) => {
                const isSelected = selectedAnswers.includes(answer.itemIndex);
                return (
                  <div
                    key={answer.itemIndex}
                    onClick={() => handleAnswerSelection(answer.itemIndex)}
                    className={cn(
                      "group relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                      isSelected
                        ? "border-blue-500 bg-blue-50/40 shadow-sm z-10"
                        : "border-zinc-100 hover:border-blue-200 hover:bg-zinc-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "bg-blue-600 border-blue-600"
                          : "border-zinc-300 bg-white group-hover:border-zinc-400"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span
                      className={cn(
                        "font-medium text-base md:text-lg transition-colors",
                        isSelected
                          ? "text-blue-900"
                          : "text-zinc-700 group-hover:text-zinc-900"
                      )}
                    >
                      {answer.item}
                    </span>
                  </div>
                );
              })}

              {errors.items && (
                <div className="flex items-center gap-2 p-3 text-red-500 rounded-lg bg-red-50 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p className="text-sm font-medium">{errors.items.message}</p>
                </div>
              )}
            </CardContent>

            <div className="p-6 pt-0 md:p-8">
              <Button
                type="submit"
                disabled={isPending || selectedAnswers.length === 0}
                className="w-full h-12 text-base font-bold transition-all bg-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
              >
                {isPending ? "제출 중..." : "정답 제출하기"}
              </Button>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
}
