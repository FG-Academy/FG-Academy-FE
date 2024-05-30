import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function useQnaDeleteMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteQuestion"],
    mutationFn: async (questionId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna?questionId=${questionId}`,
        {
          next: {
            tags: ["deleteQuestion"],
          },
          credentials: "include",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          method: "DELETE",
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
        queryKey: ["qna"],
      });
      toast({
        title: "질문게시글 삭제 성공",
        description: "질문게시글을 삭제했습니다.",
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

export function useCommentDeleteMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (answerId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/answers?answerId=${answerId}`,
        {
          next: {
            tags: ["deleteComment"],
          },
          credentials: "include",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          method: "DELETE",
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
        queryKey: ["qna"],
      });
      toast({
        title: "답변 삭제 성공",
        description: "답변을 삭제했습니다.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.message,
        description: "확인 후 다시 시도해주세요.",
      });

      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
