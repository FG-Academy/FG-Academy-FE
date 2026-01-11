import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import { updateProfile } from "./update-profile";
import type { ProfileUpdateFormValues } from "../model/profile.schema";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: Partial<ProfileUpdateFormValues>) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["quizSubmits"] });
      toast({
        title: "회원정보 변경 성공",
        description: "회원정보 변경에 성공했습니다.",
      });
      router.push("/me/profile");
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
      console.error("Profile update error:", error.message);
    },
  });
}
