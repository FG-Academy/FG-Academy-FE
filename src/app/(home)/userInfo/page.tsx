import { InputForm } from "./components/UserInfo";

export default function UserInfo() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">내 정보 수정</h3>
      <InputForm />
    </div>
  );
}
