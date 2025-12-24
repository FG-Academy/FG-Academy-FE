import { signIn } from "next-auth/react";
import { toast } from "@/6.shared/ui";
import { LoginFormData } from "../model/schema";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export const loginUser = async (data: LoginFormData): Promise<LoginResult> => {
  try {
    console.log("Logging in user with data:", data);
    const response = await signIn("credentials", {
      nameBirthId: data.nameBirthId,
      password: data.password,
      redirect: false,
    });
    console.log("Sign-in response:", response);

    if (response?.error) {
      toast({
        variant: "destructive",
        title: "아이디와 비밀번호가 일치하지 않습니다.",
        description: "아이디와 비밀번호를 다시 한 번 확인해주세요.",
      });
      return { success: false, error: response.error };
    }

    return { success: true };
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    toast({
      variant: "destructive",
      title: "네트워크 오류가 발생했습니다.",
      description: "잠시 후 다시 시도해주세요.",
    });
    return { success: false, error: "Network error" };
  }
};
