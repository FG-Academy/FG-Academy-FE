"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import type { AdminQuizSubmission } from "@/5.entities/admin/quiz";
import { useQuizGradingDialogStore } from "@/4.features/admin/manage-quiz";
import { StatusBadge, getQuizAnswerStatusVariant } from "@/6.shared/ui/admin";
import { Eye, PenLine } from "lucide-react";

// 별도 컴포넌트로 분리하여 Hook 사용
function ActionsCell({ row }: CellContext<AdminQuizSubmission, unknown>) {
  const { openDialog } = useQuizGradingDialogStore();
  const quizType = row.getValue("quizType") as string;
  const userId = row.getValue("userId") as number;
  const quizId = row.getValue("quizId") as number;
  const isDescriptive = quizType === "주관식";

  return (
    <button
      onClick={() => openDialog(userId, quizId)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      {isDescriptive ? (
        <>
          <PenLine className="w-3.5 h-3.5" />
          채점
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5" />
          보기
        </>
      )}
    </button>
  );
}

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
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        레벨
      </span>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    size: 100,
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        이름
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{row.getValue("name")}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "positionLabel",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        직분
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue("positionLabel")}</span>
    ),
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "departmentLabel",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        부서
      </span>
    ),
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
        {row.getValue("departmentLabel")}
      </span>
    ),
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "courseTitle",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        코스
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600 max-w-[150px] truncate block">
        {row.getValue("courseTitle")}
      </span>
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
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        유형
      </span>
    ),
    cell: ({ row }) => {
      const quizType = row.getValue("quizType") as string;
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
            quizType === "주관식"
              ? "bg-purple-50 text-purple-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {quizType}
        </span>
      );
    },
    meta: {
      filterVariant: "select",
    },
    enableHiding: false,
  },
  {
    accessorKey: "answerType",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        채점
      </span>
    ),
    cell: ({ row }) => {
      const answerType = row.getValue("answerType") as string;
      return (
        <StatusBadge variant={getQuizAnswerStatusVariant(answerType)}>
          {answerType}
        </StatusBadge>
      );
    },
    meta: {
      filterVariant: "select",
    },
    enableHiding: false,
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        관리
      </span>
    ),
    cell: (props) => <ActionsCell {...props} />,
    enableHiding: false,
  },
];
