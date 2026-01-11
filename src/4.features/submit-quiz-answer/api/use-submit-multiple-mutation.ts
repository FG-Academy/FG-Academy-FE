"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { submitQuizAnswer } from "./submit-quiz-answer";
import type { MultipleAnswerFormValues } from "../model/multiple-answer.schema";

interface UseSubmitMultipleMutationProps {
  quizId: number;
}

/** 객관식 퀴즈 답변 제출 mutation hook */
export function useSubmitMultipleMutation({
  quizId,
}: UseSubmitMultipleMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["submitMultipleAnswer", quizId],
    mutationFn: async (data: MultipleAnswerFormValues) => {
      return submitQuizAnswer({
        quizId,
        answer: JSON.stringify(data.items),
        multipleAnswer: 1,
      });
    },
    onSuccess: () => {
      toast({
        title: "답변 제출을 완료 했습니다.",
        duration: 10000,
      });
      queryClient.invalidateQueries({ queryKey: ["myCourse"] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error: { status?: number; message?: string }) => {
      toast({
        variant: "destructive",
        title: error.message || "답변 제출에 실패했습니다.",
        duration: 3000,
      });
      console.error("Submit multiple answer error:", error.message);
    },
  });
}
