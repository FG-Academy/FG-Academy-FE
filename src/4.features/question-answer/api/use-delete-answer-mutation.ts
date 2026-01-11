import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { deleteAnswer } from "./delete-answer";

const useDeleteAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (answerId: number) => deleteAnswer(answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "답변 삭제 성공",
        description: "답변을 삭제했습니다.",
      });
    },
    onError: (error: Error & { message?: string }) => {
      toast({
        variant: "destructive",
        title: error.message || "네트워크 오류가 발생했습니다.",
        description: "확인 후 다시 시도해주세요.",
      });

      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
};

export { useDeleteAnswerMutation };
