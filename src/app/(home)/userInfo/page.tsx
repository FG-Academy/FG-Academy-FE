"use client";

import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "./components/UserInfo";
import { UserProfile } from "./types/type";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const {
    isPending,
    error,
    data: userInfo,
  } = useQuery<UserProfile>({
    queryKey: ["userInfo"],
    queryFn: () =>
      fetch("http://localhost:3000/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
    enabled: !!accessToken,
  });

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">내 정보 수정</h3>
      <UserInfo userInfo={userInfo} />
    </div>
  );
}
