import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { createQuiz } from "./create-quiz";
import { updateQuiz } from "./update-quiz";
import { deleteQuiz } from "./delete-quiz";

/** Hook for creating a new quiz */
export function useCreateQuizMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createQuiz"],
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["adminQuizzes"] });
      toast({
        title: "퀴즈 등록 완료",
        description: "퀴즈를 성공적으로 등록했습니다.",
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다.",
        description: "잠시 후 다시 시도해주세요. 오류 지속 시 개발사 측에 문의해주세요.",
      });
      console.error("Create quiz error:", error.message);
    },
  });
}

/** Hook for updating an existing quiz */
export function useUpdateQuizMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateQuiz"],
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["adminQuizzes"] });
      toast({
        title: "퀴즈 수정 완료",
        description: "퀴즈를 성공적으로 수정했습니다.",
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다.",
        description: "잠시 후 다시 시도해주세요. 오류 지속 시 개발사 측에 문의해주세요.",
      });
      console.error("Update quiz error:", error.message);
    },
  });
}

/** Hook for deleting a quiz */
export function useDeleteQuizMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteQuiz"],
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["adminQuizzes"] });
      toast({
        title: "퀴즈 삭제 성공",
        description: "퀴즈 삭제에 성공하였습니다.",
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Delete quiz error:", error.message);
    },
  });
}
