"use client";

import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import UserForm from "./UserForm";
import { useFetchUserProfileByIdQuery } from "../../hooks/useUserQuery";

type Props = {
  userId: number;
};

export function UserInfoDialog({ userId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: userProfile } = useFetchUserProfileByIdQuery(
    accessToken,
    userId
  );

  if (!userProfile) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <UserForm userProfile={userProfile} userId={userId} />
      <div className="space-y-2">
        <h1 className="font-semibold text-lg">수강 중인 강의</h1>
        {userProfile.enrollments.length > 0 ? (
          <ul className="space-y-2">
            {userProfile.enrollments.map((enrollment) => (
              <li className="bg-gray-100 p-2 text-center" key={enrollment.id}>
                {enrollment.course?.title || "제목 없음"}{" "}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">수강 신청한 이력이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
