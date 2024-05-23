"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import useEmailVerifyStore from "@/store/useEmailVerifyStore";

export function useEmailVerifyMutation(form: any) {
  const { setVerificationSent, setVerificationCode, setLoading } =
    useEmailVerifyStore((state) => state);

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (email: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up/emailCheck?email=${email}`,
        {
          next: {
            tags: ["emailCheck"],
          },
          credentials: "include",
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
      setVerificationCode(data.result);
      setVerificationSent(true);
      form.setValue("isEmailValid", true);
      toast({
        title: "이메일 전송 성공",
        description: "이메일로 인증 코드를 보냈습니다.",
      });
      setLoading(false);
      // router.push("/login");
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
