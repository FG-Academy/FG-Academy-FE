"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { submitQuizAnswer } from "./submit-quiz-answer";
import type { DescriptiveAnswerFormValues } from "../model/descriptive-answer.schema";

interface UseSubmitDescriptiveMutationProps {
  quizId: number;
}

/** 주관식 퀴즈 답변 제출 mutation hook */
export function useSubmitDescriptiveMutation({
  quizId,
}: UseSubmitDescriptiveMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["submitDescriptiveAnswer", quizId],
    mutationFn: async (data: DescriptiveAnswerFormValues) => {
      return submitQuizAnswer({
        quizId,
        answer: data.descriptiveAnswer,
        multipleAnswer: 0,
      });
    },
    onSuccess: () => {
      toast({
        title: "주관식 퀴즈 제출 성공",
        description: "주관식 퀴즈를 제출하셨습니다.",
      });
      queryClient.invalidateQueries();
    },
    onError: (error: { status?: number; message?: string }) => {
      toast({
        variant: "destructive",
        title: error.message || "제출 실패",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Submit descriptive answer error:", error.message);
    },
  });
}
