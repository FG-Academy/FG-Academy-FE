"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { AdminQuizSubmission } from "@/5.entities/admin/quiz";
import { useQuizGradingDialogStore } from "@/4.features/admin/manage-quiz";

export const quizSubmissionsColumns: ColumnDef<AdminQuizSubmission>[] = [
  {
    accessorKey: "userId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "quizId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "level",
    header: () => <div className="text-center">레벨</div>,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    size: 100,
    header: () => <div className="text-center">이름</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "positionLabel",
    header: () => <div className="text-center">직분</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("positionLabel")}</div>
    ),
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "departmentLabel",
    header: () => <div className="text-center">부서</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("departmentLabel")}</div>
    ),
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "courseTitle",
    header: () => <div className="text-center">코스이름</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("courseTitle")}</div>
    ),
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "quizType",
    header: () => <div className="text-center">퀴즈 유형</div>,
    cell: ({ row }) => {
      const quizType = row.getValue("quizType") as string;
      return <div className="text-center">{quizType}</div>;
    },
    meta: {
      filterVariant: "select",
    },
    enableHiding: false,
  },
  {
    accessorKey: "answerType",
    header: () => <div className="text-center">채점 현황</div>,
    cell: ({ row }) => {
      const answerType = row.getValue("answerType") as string;
      const getColorClass = (type: string) => {
        switch (type) {
          case "정답":
            return "text-green-500";
          case "오답":
            return "text-red-500";
          case "미채점":
            return "text-orange-500";
          default:
            return "";
        }
      };

      return (
        <div className={`text-center font-medium ${getColorClass(answerType)}`}>
          {answerType}
        </div>
      );
    },
    meta: {
      filterVariant: "select",
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { openDialog } = useQuizGradingDialogStore();
      const quizType = row.getValue("quizType") as string;
      const userId = row.getValue("userId") as number;
      const quizId = row.getValue("quizId") as number;

      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => openDialog(userId, quizId)}
        >
          {quizType === "주관식" ? "채점하기" : "상세보기"}
        </Button>
      );
    },
    enableHiding: false,
  },
];
