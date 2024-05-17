import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ProfileFormSchema } from "@/app/(home)/userInfo/lib/profileFormSchema";
import { CourseFormSchema } from "../../../videos/lib/CourseFormSchema";

type QuizPostRequest = {
  question: string;
  quizType: string;
  quizInfo: any[];
};

export function useQuizRegisterMutation(
  accessToken: string,
  lectureId: number
) {
  const queryClient = useQueryClient();
  const router = useRouter(); // router 사용 설정

  return useMutation({
    mutationKey: ["registerQuiz"],
    mutationFn: async ({ question, quizType, quizInfo }: QuizPostRequest) => {
      console.log(JSON.stringify({ question, quizType, quizInfo }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes/register/${lectureId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ question, quizType, quizInfo }),
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
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["adminQuizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["lectures"],
      });
      toast({
        title: "퀴즈 등록 완료",
        description: "퀴즈를 성공적으로 등록했습니다.",
      });
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다..",
        description:
          "잠시 후 다시 시도해주세요. 오류 지속 시 개발사 측에 문의해주세요",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
