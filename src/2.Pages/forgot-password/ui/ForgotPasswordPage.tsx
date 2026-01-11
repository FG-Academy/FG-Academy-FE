"use client";

import {
  EmailForm,
  CodeVerification,
  ResetPasswordForm,
  useResetPasswordStore,
} from "@/4.features/reset-password";

export function ForgotPasswordPage() {
  const { uiState } = useResetPasswordStore();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[343px] items-center justify-center h-full py-12">
        <div className="mb-4 text-sm text-gray-600 text-start">
          {uiState === "emailVerification"
            ? "가입한 이메일 주소를 입력해주세요."
            : uiState === "enterCode"
            ? "이메일로 받은 인증코드를 입력해주세요."
            : ""}
        </div>
        {uiState === "emailVerification" && <EmailForm />}
        {uiState === "enterCode" && <CodeVerification />}
        {uiState === "resetPassword" && <ResetPasswordForm />}
      </div>
    </div>
  );
}
