import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import type { QuestionPatchFormValues } from "@/5.entities/question";
import { editQuestion } from "./edit-question";

const useEditQuestionMutation = (questionId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["patchQuestion"],
    mutationFn: (data: QuestionPatchFormValues) =>
      editQuestion(questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "질문 게시글 수정 성공",
        description: "질문 게시글 수정에 성공했습니다.",
      });
      router.push(`/qna/${questionId}`);
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

export { useEditQuestionMutation };
