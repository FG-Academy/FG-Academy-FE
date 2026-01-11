"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileForm } from "@/4.features/edit-profile";
import { userQueries } from "@/5.entities/user";

/**
 * 내 프로필 페이지 컨텐츠 (클라이언트 컴포넌트)
 * SSR에서 HydrationBoundary로 감싸서 사용
 * 인증은 미들웨어에서 처리됨
 */
export function MyProfilePageContent() {
  const { data: userProfile } = useSuspenseQuery(userQueries.profile());

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full overflow-y-auto font-medium bg-white font-Pretendard">
      <h3 className="mb-10 text-xl font-bold">내 정보 수정</h3>
      <ProfileForm userInfo={userProfile} />
      <div className="p-10 font-medium font-Pretendard">
        <Link className="cursor-pointer underline" href="/forgot-password">
          비밀번호 재설정
        </Link>
      </div>
    </div>
  );
}
