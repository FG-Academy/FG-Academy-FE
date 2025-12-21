import { useMutation } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { verifyEmail } from "./verify-email";
import { useSignupStore } from "../model/signup.store";
import type { UseFormReturn } from "react-hook-form";
import type { SignupFormValues } from "@/5.entities/user";

export function useEmailVerifyMutation(
  form: UseFormReturn<SignupFormValues>
) {
  const { setVerificationCode, setVerificationSent, setLoading } =
    useSignupStore();

  return useMutation({
    mutationKey: ["emailVerify"],
    mutationFn: (email: string) => verifyEmail(email),
    onSuccess: (data) => {
      setVerificationCode(data.result);
      setVerificationSent(true);
      form.setValue("isEmailValid", true);
      toast({
        title: "이메일 전송 성공",
        description: "이메일로 인증 코드를 보냈습니다.",
      });
      setLoading(false);
    },
    onError: (error: { status?: number; message?: string }) => {
      setLoading(false);
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
      console.error("Email verify error:", error.message);
    },
  });
}
