import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function useCourseDeleteMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter(); // router 사용 설정

  return useMutation({
    mutationKey: ["deleteCourseByAdmin"],
    mutationFn: async (courseIds: number[]) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/courses`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseIds }),
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
        queryKey: ["lectures"],
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
      });
      toast({
        title: "강의 삭제 성공",
        description: "강의 삭제에 성공하였습니다.",
      });
      router.push("/admin/videos");
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
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
