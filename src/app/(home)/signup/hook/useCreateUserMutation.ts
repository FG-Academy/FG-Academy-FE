import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UserFormWithEmailSchema } from "../lib/UserFormSchema";
import useEmailVerifyStore from "@/store/useEmailVerifyStore";

type UserPatchRequest = {
  data: z.infer<typeof UserFormWithEmailSchema>;
};

export function useUserCreateMutation() {
  const queryClient = useQueryClient();
  const router = useRouter(); // router 사용 설정
  const { setVerificationSent, setVerificationCode } = useEmailVerifyStore(
    (state) => state
  );

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async ({ data }: UserPatchRequest) => {
      const { passwordVerify, isEmailValid, ...bodyData } = data;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          next: {
            tags: ["createUser"],
          },
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(bodyData),
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
        queryKey: ["userProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
      toast({
        title: "회원가입 성공",
        description: "회원가입에 성공하였습니다.",
      });
      setVerificationSent(false);
      router.push("/login");
    },
    onError: (error: any) => {
      // 이곳에서 error 객체의 status에 따라 다른 toast 메시지를 출력
      if (error.status === 422) {
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
