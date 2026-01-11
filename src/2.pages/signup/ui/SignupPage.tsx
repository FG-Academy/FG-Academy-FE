"use client";

import { SignupForm } from "@/4.features/signup-user";

export function SignupPage() {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">회원가입</h3>
      <SignupForm />
    </div>
  );
}
