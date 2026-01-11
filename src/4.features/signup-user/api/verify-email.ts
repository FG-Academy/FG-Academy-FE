import { apiClient } from "@/6.shared/api";

interface EmailCheckResponse {
  result: string;
}

export async function verifyEmail(email: string): Promise<EmailCheckResponse> {
  return apiClient.get<EmailCheckResponse>("/auth/sign-up/emailCheck", {
    params: { email },
  });
}

export async function resendVerificationEmail(
  email: string
): Promise<{ result: string }> {
  return apiClient.get<{ result: string }>("/users/email", {
    params: { email },
  });
}
