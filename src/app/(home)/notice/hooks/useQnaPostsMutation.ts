import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { PostFormSchema } from "../lib/PostFormSchema";

export function useQnaPostsMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: z.infer<typeof PostFormSchema>) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        next: {
          tags: ["updateUserProfile"],
        },
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        }; // 에러 객체를 throw
      }

      return response.json(); // 성공 응답 데이터 반환
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast({
        title: "공지사항 등록 성공",
        description: "공지사항 등록 성공에 성공했습니다.",
      });
      router.push("/notice?page=1");
    },
    onError: (error: any) => {
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
}
