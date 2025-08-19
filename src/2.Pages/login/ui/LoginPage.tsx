"use client";

import Link from "next/link";
import { Logo } from "@/6.shared/ui";
import { LoginForm } from "@/4.features/login-user";

const LoginPage = () => {
  return (
    <div className="flex w-full h-full p-4 sm:p-0 min-h-[calc(100vh-16rem)] items-center justify-center overflow-auto">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <LoginForm />
        <div className="flex justify-between space-x-12 text-gray-600 underline">
          <Link className="cursor-pointer" href="/findPassword">
            비밀번호 재설정
          </Link>
          <Link className="cursor-pointer" href="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
