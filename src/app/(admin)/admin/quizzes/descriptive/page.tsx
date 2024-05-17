"use client";

import { useSession } from "next-auth/react";
import { DescriptiveDataTableQuiz } from "../descriptive/components/DescriptiveDataTable";
import { DescriptiveQuizColumn } from "../descriptive/components/DescriptiveQuizColumn";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useQuizSubmitQuery } from "./hooks/useQuizSubmitQuery";

export default function AdminQuizPage() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: quizSubmits } = useQuizSubmitQuery(accessToken);

  if (!quizSubmits) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full p-4 space-y-2">
      <div className="text-xl font-bold font-sans">주관식 퀴즈 관리</div>
      <div className="flex flex-col p-2 h-full">
        <DescriptiveDataTableQuiz
          columns={DescriptiveQuizColumn}
          data={quizSubmits}
        />
      </div>
    </div>
  );
}
