import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import { deleteQuestion } from "./delete-question";

const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteQuestion"],
    mutationFn: (questionId: number) => deleteQuestion(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "질문게시글 삭제 성공",
        description: "질문게시글을 삭제했습니다.",
      });
      router.push("/qna?page=1");
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

export { useDeleteQuestionMutation };
