"use client";

import { enrollmentResponse } from "@/hooks/useEnrollmentQuery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEnrollmentMutate } from "../hook/useEnrollmentMutate";

type Props = {
  enrollment: enrollmentResponse;
  courseId: number;
};

export default function EnrollButton({ enrollment, courseId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { mutate } = useEnrollmentMutate(courseId, accessToken);

  return (
    <div>
      {enrollment.isTaking ? (
        <button
          className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
          onClick={() => {
            if (enrollment.completedLectures === enrollment.totalCount) {
              // 현재 사용자가 수강 중인 강좌로 이동
              router.push(
                `/course/${courseId}/lecture/${enrollment.lastStudyLecture}`
              );
            }

            // 현재 사용자가 수강 중인 강좌로 이동
            router.push(
              `/course/${courseId}/lecture/${enrollment.lastStudyLecture + 1}`
            );
          }}
        >
          이어듣기
        </button>
      ) : enrollment.isTaking === null ? (
        <button
          className="w-full px-4 py-2 text-black transition-colors duration-150"
          disabled={true}
        >
          {enrollment.message}
        </button>
      ) : (
        <button
          className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
          onClick={() => mutate()}
        >
          수강신청
        </button>
      )}
    </div>
  );
}
