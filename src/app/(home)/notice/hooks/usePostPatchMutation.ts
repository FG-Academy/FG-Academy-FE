import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { PostPatchFormSchema } from "../lib/PostFormSchema";

export function usePostPatchMutation(
  accessToken: string,
  announcementId: number
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["patchQuestion"],
    mutationFn: async ({
      data,
    }: {
      data: z.infer<typeof PostPatchFormSchema>;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${announcementId}`,
        {
          next: {
            tags: ["patchQuestion"],
          },
          credentials: "include",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(data),
        }
      );
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
        queryKey: ["post"],
      });
      toast({
        title: "공지사항 수정 성공",
        description: "공지사항 수정에 성공했습니다.",
      });
      router.push(`/notice/${announcementId}`);
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
