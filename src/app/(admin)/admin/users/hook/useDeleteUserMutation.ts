import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

type UserPatchRequest = {
  accessToken: string;
  userId: number;
};

export function useDeleteUserMutation() {
  return useMutation({
    mutationKey: ["updateUserProfileByAdmin"],
    mutationFn: async ({ accessToken, userId }: UserPatchRequest) => {
      // console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
      toast({
        title: "유저 삭제 성공",
        description: "유저가 삭제되었습니다.",
      });
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: error.message,
      });
    },
  });
}
