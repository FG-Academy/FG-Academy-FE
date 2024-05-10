"use client";

import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchAllUserListQuery } from "@/hooks/useUserQuery";
import { MultipleDataTableQuiz } from "./components/MultipleDataTableQuiz";
import { MultipleQuizColumn } from "./components/MultipleQuizColumn";

export default function AdminQuizPage() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: allUsers } = useFetchAllUserListQuery(accessToken);

  if (!allUsers) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full p-4 space-y-2">
      <div className="text-xl font-bold font-sans">객관식 퀴즈 관리</div>
      <div className="flex flex-col h-full">
        <MultipleDataTableQuiz
          columns={MultipleQuizColumn}
          data={allUsers.users}
        />
      </div>
    </div>
  );
}
