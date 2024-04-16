"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSession } from "next-auth/react";
import {
  departments,
  positions,
  TChurchName,
  TDepartment,
  TPosition,
} from "@/app/(home)/userInfo/types/type";
import { dateFormat } from "@/lib/dateFormat";
import { UserProfile } from "@/model/user";
import { ProfileFormSchema } from "@/app/(home)/userInfo/lib/profileFormSchema";
import { useUserMutationFromAdmin } from "../hook/useUserMutationFromAdmin";
import { useFetchUserProfileByIdQuery } from "@/hooks/useUserQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import UserForm from "./UserForm";

type Props = {
  userInfo?: UserProfile;
  userId: number;
};

export function UserInfoDialog({ userInfo, userId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  // const { userId } = userInfo;
  // console.log(userId);

  const { data: userProfile } = useFetchUserProfileByIdQuery(
    accessToken,
    userId
  );

  if (!userProfile) {
    return <Loading />;
  }

  // const form = useForm<z.infer<typeof ProfileFormSchema>>({
  //   resolver: zodResolver(ProfileFormSchema),
  //   mode: "onChange",
  //   defaultValues: {
  //     name: userInfo.name,
  //     email: userInfo.email,
  //     birthDate: dateFormat(new Date(userInfo.birthDate)),
  //     phoneNumber: userInfo.phoneNumber,
  //     churchName: userInfo.churchName as TChurchName,
  //     departmentName: userInfo.departmentName as TDepartment,
  //     position: userInfo.position as TPosition,
  //     yearsOfService: userInfo.yearsOfService,
  //     // enrollment:
  //     // userInfo.lectures?.length > 0
  //     //   ? courseInfo.lectures
  //     //   : [{ lectureId: 0, title: "", videoLink: "", lectureNumber: 0 }],
  //   },
  // });

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
