"use client";

import { useSession } from "next-auth/react";
import { DataTableQuiz } from "../../components/DataTableQuiz";
import { DescriptiveDataTableQuiz } from "../../components/DescriptiveDataTable";
import { MultipleQuizColumn } from "../../components/MultipleQuizColumn";
import { DescriptiveQuizColumn } from "../../components/DescriptiveQuizColumn";
import { useQuery } from "@tanstack/react-query";
import { getAllQuizDAta } from "../../lib/getAllQuizData";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { AdminQuizInfo, IAdminQuizData } from "@/model/adminQuiz";

export default function AdminQuizPage() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: allQuizData } = useQuery<IAdminQuizData[]>({
    queryKey: ["allQuiz"],
    queryFn: () => getAllQuizDAta(accessToken),
    enabled: !!accessToken,
  });

  if (!allQuizData) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 px-10">
      <div className="text-xl font-bold font-sans">객관식 퀴즈 관리</div>
      <div className="flex flex-col p-2 h-[376px]">
        <DataTableQuiz columns={MultipleQuizColumn} data={allQuizData} />
      </div>
      <div className="text-xl mt-4 font-bold font-sans">주관식 퀴즈 관리</div>
      <div className="flex flex-col p-2 h-[376px]">
        {/* TODO: 주관식 퀴즈 리스트 부분 구현해야함 */}
        <DescriptiveDataTableQuiz
          columns={DescriptiveQuizColumn}
          data={allQuizData}
        />
        {/* <DataTableQuiz columns={MultipleQuizColumn} data={allQuizData} /> */}
      </div>
    </div>
  );
}
