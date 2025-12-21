import { API_URL } from "@/6.shared/config";

interface EmailCheckResponse {
  result: string;
}

export async function verifyEmail(email: string): Promise<EmailCheckResponse> {
  const response = await fetch(
    `${API_URL}/auth/sign-up/emailCheck?email=${email}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message ?? "에러가 발생했습니다.",
    };
  }

  return response.json();
}

export async function resendVerificationEmail(
  email: string
): Promise<{ result: string }> {
  const response = await fetch(`${API_URL}/users/email?email=${email}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to resend email");
  }

  return response.json();
}
