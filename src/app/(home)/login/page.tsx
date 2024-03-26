import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[380px] py-12 overflow-y-auto font-medium bg-white font-Pretendard">
        <h3 className="mb-10 text-xl font-bold">로그인</h3>
        <LoginForm />
        <div className="flex flex-row justify-between mt-6 space-x-12 text-gray-600 underline">
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
}
