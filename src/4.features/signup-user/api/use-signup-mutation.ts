import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import { signupUser } from "./signup-user";
import { useSignupStore } from "../model/signup.store";
import type { SignupFormValues } from "@/5.entities/user";

export function useSignupMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setVerificationSent } = useSignupStore();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupFormValues) => signupUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast({
        title: "회원가입 성공",
        description: "회원가입에 성공하였습니다.",
      });
      setVerificationSent(false);
      router.push("/login");
    },
    onError: (error: { status?: number; message?: string }) => {
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
      console.error("Signup error:", error.message);
    },
  });
}
