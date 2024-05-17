"use client";

import { UserInfo } from "./components/UserInfo";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchUserProfileQuery } from "./hook/useUserQuery";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: userProfile } = useFetchUserProfileQuery(accessToken);

  if (!userProfile) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">내 정보 수정</h3>
      <UserInfo userInfo={userProfile} />
      <div className="p-10 font-mediumfont-Pretendard">
        <Link className="cursor-pointer underline" href="/findPassword">
          비밀번호 재설정
        </Link>
      </div>
    </div>
  );
}
