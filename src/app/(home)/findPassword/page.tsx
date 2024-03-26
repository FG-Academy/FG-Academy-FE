"use client";

import useResetPasswordStore from "@/store/resetPasswordStore";
import EmailForm from "./components/EmailForm";
import EmailVerification from "./components/EmailVerification";
import ResetPassword from "./components/ResetPassword";

export default function Page() {
  const { uiState } = useResetPasswordStore((state) => state);

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
        {uiState === "enterCode" && <EmailVerification />}
        {uiState === "resetPassword" && <ResetPassword />}
      </div>
    </div>
  );
}
