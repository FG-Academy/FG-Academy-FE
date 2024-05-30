import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PostFormSchema } from "../lib/PostFormSchema";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { CommentFormSchema } from "../lib/CommentFormSchema";

export function useQnaMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createQuestion"],
    mutationFn: async (data: z.infer<typeof PostFormSchema>) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qna`, {
        next: {
          tags: ["createQuestion"],
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
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "질문 게시물 등록 성공",
        description: "질문 등록에 성공했습니다.",
      });
      router.push("/qna?page=1");
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
export function useCommentMuation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async ({
      data,
      questionId,
    }: {
      data: z.infer<typeof CommentFormSchema>;
      questionId: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/answers?questionId=${questionId}`,
        {
          next: {
            tags: ["createComment"],
          },
          credentials: "include",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["qna"],
      });
      toast({
        title: "답변 등록 성공",
        description: "답변 등록에 성공했습니다.",
      });
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
