import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import type { QuestionFormValues } from "@/5.entities/question";
import { createQuestion } from "./create-question";

const useCreateQuestionMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createQuestion"],
    mutationFn: (data: QuestionFormValues) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "질문 등록 성공",
        description: "질문이 성공적으로 등록되었습니다.",
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

export { useCreateQuestionMutation };
