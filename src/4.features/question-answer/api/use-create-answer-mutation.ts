import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import type { AnswerFormValues } from "@/5.entities/question";
import { createAnswer } from "./create-answer";

const useCreateAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: ({
      questionId,
      data,
    }: {
      questionId: number;
      data: AnswerFormValues;
    }) => createAnswer(questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "답변 등록 성공",
        description: "답변 등록에 성공했습니다.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });

      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
};

export { useCreateAnswerMutation };
