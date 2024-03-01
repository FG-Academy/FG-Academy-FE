import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">로그인</h3>
      <LoginForm />
    </div>
  );
}
