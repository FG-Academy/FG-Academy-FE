import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import z from "zod";
import { AnswerFormSchema } from "../lib/AnswerFornSchema";

export function useSubmitDescriptiveAnswerMutation(
  accessToken: string,
  quizId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["submitDescriptiveAnswer"],
    mutationFn: async (data: z.infer<typeof AnswerFormSchema>) => {
      const dataBody = {
        quizId,
        multipleAnswer: 0,
        answer: data.descriptiveAnswer,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/answer`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(dataBody),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json(); // 성공 응답 데이터 반환
    },
    onSuccess: (data) => {
      toast({
        title: "주관식 퀴즈 제출 성공",
        description: "주관식 퀴즈를 제출하셨습니다.",
      });
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
      toast({
        variant: "destructive",
        title: error.message,
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
