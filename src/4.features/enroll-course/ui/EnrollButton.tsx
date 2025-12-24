"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button, Spinner } from "@/6.shared/ui";
import { CourseEnrollment } from "@/5.entities/enrollment";
import { useEnrollmentMutation } from "../api/use-enrollment-mutation";

type Props = {
  enrollment: CourseEnrollment;
  firstLectureId: number | null;
};

export function EnrollButton({ enrollment, firstLectureId }: Props) {
  const params = useParams();
  const courseId = Number(params.courseId);

  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  if (!accessToken) {
    return <LoginRequiredButton onLogin={() => router.push("/login")} />;
  }

  if (enrollment.isTaking) {
    return (
      <ContinueButton
        disabled={enrollment.lastStudyLecture === null}
        onContinue={() => {
          if (enrollment.lastStudyLecture !== null) {
            console.log(
              `/course/${courseId}/lecture/${enrollment.lastStudyLecture}`
            );
            router.push(
              `/course/${courseId}/lecture/${enrollment.lastStudyLecture}`
            );
          }
        }}
      />
    );
  }

  // 수강 완료한 경우
  if (enrollment.isTaking === null) {
    return (
      <CompletedBlock
        totalCount={enrollment.totalCount}
        onRestart={() => {
          if (firstLectureId) {
            router.push(`/course/${courseId}/lecture/${firstLectureId}`);
          }
        }}
      />
    );
  }

  // 수강 신청 버튼
  return (
    <EnrollCTA
      courseId={courseId}
      lastStudyLecture={enrollment.lastStudyLecture}
      canEnroll={enrollment.totalCount > 0}
    />
  );
}

function LoginRequiredButton({ onLogin }: { onLogin: () => void }) {
  const { status } = useSession();
  return (
    <Button
      disabled={status === "loading"}
      className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
      onClick={onLogin}
    >
      로그인 후 수강신청
    </Button>
  );
}

function ContinueButton({
  disabled,
  onContinue,
}: {
  disabled: boolean;
  onContinue: () => void;
}) {
  return (
    <Button
      disabled={disabled}
      className="w-full px-4 py-2 text-white transition-colors duration-150 bg-primary-blue rounded-xl hover:bg-blue-600"
      onClick={onContinue}
    >
      이어 듣기
    </Button>
  );
}

function CompletedBlock({
  totalCount,
  onRestart,
}: {
  totalCount: number;
  onRestart: () => void;
}) {
  return (
    <div className="w-full px-4 py-2 text-center ">
      완강하셨습니다.
      <Button
        className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
        onClick={onRestart}
      >
        {totalCount === 0 ? "수강할 강의가 없습니다." : "다시듣기"}
      </Button>
    </div>
  );
}

function EnrollCTA({
  courseId,
  lastStudyLecture,
  canEnroll,
}: {
  courseId: number;
  lastStudyLecture: number | null;
  canEnroll: boolean;
}) {
  const { mutate, isPending } = useEnrollmentMutation(
    courseId,
    lastStudyLecture
  );

  return (
    <Button
      disabled={!canEnroll || isPending}
      className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
      onClick={() => mutate()}
    >
      {isPending ? <Spinner size={24} /> : "수강신청"}
    </Button>
  );
}
