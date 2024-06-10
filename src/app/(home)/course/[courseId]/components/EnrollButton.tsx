"use client";

import { EnrollmentResponse } from "@/app/(home)/course/[courseId]/hook/useEnrollmentQuery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEnrollmentMutate } from "../hook/useEnrollmentMutate";

type Props = {
  enrollment: EnrollmentResponse;
  courseId: number;
  firstLectureId?: number | null;
};

export default function EnrollButton({
  enrollment,
  courseId,
  firstLectureId,
}: Props) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const accessToken = session?.user.accessToken;

  const { mutate } = useEnrollmentMutate(
    courseId,
    accessToken,
    enrollment.lastStudyLecture
  );

  return (
    <div>
      {enrollment.isTaking ? (
        <button
          disabled={enrollment.lastStudyLecture === null}
          className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
          onClick={() => {
            // 현재 사용자가 수강 중인 강좌로 이동
            router.push(
              `/course/${courseId}/lecture/${enrollment.lastStudyLecture}`
            );
          }}
        >
          이어듣기
        </button>
      ) : enrollment.isTaking === null ? (
        <div className="w-full px-4 py-2 text-center ">
          완강하셨습니다.
          <button
            className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
            onClick={() => {
              // 현재 사용자가 수강 중인 강좌로 이동
              router.push(`/course/${courseId}/lecture/${firstLectureId}`);
            }}
          >
            {enrollment.totalCount === 0
              ? "수강할 강의가 없습니다."
              : "다시듣기"}
          </button>
        </div>
      ) : (
        <button
          disabled={enrollment.totalCount === 0}
          className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
          onClick={() => {
            const newIds = [
              ...(session?.user.enrollmentIds as number[]),
              courseId,
            ];
            update({ enrollmentIds: newIds });
            mutate();
          }}
        >
          수강신청
        </button>
      )}
    </div>
  );
}
