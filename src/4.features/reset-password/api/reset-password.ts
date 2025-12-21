import { API_URL } from "@/6.shared/config";

export async function checkEmailExists(email: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/users/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to check email");
  }

  return response.json();
}

export async function sendVerificationCode(
  email: string
): Promise<{ code: string }> {
  const response = await fetch(`${API_URL}/users/email?email=${email}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to send verification code");
  }

  return response.json();
}

export async function resetPassword(
  email: string,
  password: string
): Promise<void> {
  const response = await fetch(`${API_URL}/users/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }
}
