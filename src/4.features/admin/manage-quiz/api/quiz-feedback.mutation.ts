import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import { submitQuizFeedback } from "./submit-quiz-feedback";

interface UseQuizFeedbackMutationParams {
  onSuccess?: () => void;
}

export function useQuizFeedbackMutation(
  params?: UseQuizFeedbackMutationParams
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["quizFeedback"],
    mutationFn: submitQuizFeedback,
    onSuccess: () => {
      // Invalidate all quiz-related queries
      queryClient.invalidateQueries({ queryKey: ["adminQuizzes"] });
      toast({
        title: "피드백 제출 완료",
        description: "피드백 제출에 성공하였습니다.",
      });
      params?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Quiz feedback error:", error.message);
    },
  });
}
