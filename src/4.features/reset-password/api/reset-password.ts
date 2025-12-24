import { apiClient } from "@/6.shared/api";

export async function checkEmailExists(email: string): Promise<boolean> {
  return apiClient.post<boolean>("/users/email", { email });
}

export async function sendVerificationCode(
  email: string
): Promise<{ code: string }> {
  return apiClient.get<{ code: string }>("/users/email", {
    params: { email },
  });
}

export async function resetPassword(
  email: string,
  password: string
): Promise<void> {
  await apiClient.patch<void>("/users/password", { email, password });
}
