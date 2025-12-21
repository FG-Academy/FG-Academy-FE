import { API_URL } from "@/6.shared/config";
import type { SignupFormValues } from "@/5.entities/user";

export async function signupUser(data: SignupFormValues): Promise<unknown> {
  const { passwordVerify, isEmailValid, ...bodyData } = data;

  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message ?? "에러가 발생했습니다.",
    };
  }

  return response.json();
}
