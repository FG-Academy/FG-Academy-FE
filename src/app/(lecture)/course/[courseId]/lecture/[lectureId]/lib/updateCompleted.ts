import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

type Props = {
  lectureId: number;
  accessToken: string;
  courseId: number;
  refetchProgress: any;
};

export function useCompleteMutations({
  lectureId,
  accessToken,
  courseId,
  refetchProgress,
}: Props) {
  return useMutation({
    mutationKey: ["updateLectureByAdmin"],
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/completed/${lectureId}/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
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
      refetchProgress();
      toast({
        title: "수강을 완료하였습니다.",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "잘못된 양식입니다..",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
