"use client";

import QuizDetailContents from "@/app/(home)/myDashboard/components/QuizDetailContents";
import { useFetchAdminQuizListQuery } from "@/hooks/useQuizQuery";
import { useSession } from "next-auth/react";

interface Props {
  userId: number;
}

export default function MultipleQuizInfoDialog({ userId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const getQuizDataType = "multiple";

  const { data: submittedQuizList } = useFetchAdminQuizListQuery(
    accessToken,
    userId,
    getQuizDataType
  );

  return (
    <div className="flex w-full flex-col overflow-y-scroll">
      {submittedQuizList?.map((ele, index) => (
        <div key={index}>
          <QuizDetailContents data={ele} />
        </div>
      ))}
    </div>
  );
}
