import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  ProfileFormSchema,
  ProfileUpdateFormSchema,
} from "@/app/(home)/userInfo/lib/profileFormSchema";
import useOpenDialogStore from "@/store/useOpenDialogStore";

type UserPatchRequest = {
  accessToken: string;
  data: z.infer<typeof ProfileUpdateFormSchema>;
  userId: number;
};

export function useUserMutationFromAdmin() {
  const queryClient = useQueryClient();

  const { setOpen } = useOpenDialogStore((state) => state);

  return useMutation({
    mutationKey: ["updateUserProfileByAdmin"],
    mutationFn: async ({ accessToken, data, userId }: UserPatchRequest) => {
      // console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
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
        queryKey: ["users"],
      });
      setOpen(false);
      toast({
        title: "회원정보 변경 성공",
        description: "회원정보 변경에 성공했습니다.",
      });
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
      if (error.status === 409) {
        toast({
          variant: "destructive",
          title: "이미 존재하는 이메일입니다.",
          description: "다른 이메일 주소를 사용해주세요.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "네트워크 오류가 발생했습니다.",
          description: "잠시 후 다시 시도해주세요.",
        });
      }
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
