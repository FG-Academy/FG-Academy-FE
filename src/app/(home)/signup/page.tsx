import { InputForm } from "./components/SignupForm";

export default function Signup() {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">회원가입</h3>
      <InputForm />
    </div>
  );
}
