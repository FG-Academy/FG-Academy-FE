import { apiClient } from "@/6.shared/api";
import type { SignupFormValues } from "@/5.entities/user";

export async function signupUser(data: SignupFormValues): Promise<unknown> {
  const { passwordVerify, isEmailValid, ...bodyData } = data;

  return apiClient.post("/auth/sign-up", bodyData);
}
