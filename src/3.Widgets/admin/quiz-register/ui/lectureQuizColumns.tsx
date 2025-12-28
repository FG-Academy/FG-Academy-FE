"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import type { AdminLectureForQuiz } from "@/5.entities/admin/quiz";
import { useQuizRegisterDialogStore } from "@/4.features/admin/manage-quiz";

// 별도 컴포넌트로 분리하여 Hook 사용
function LectureActionsCell({ row }: CellContext<AdminLectureForQuiz, unknown>) {
  const { openDialog } = useQuizRegisterDialogStore();
  const lectureId = row.getValue("lectureId") as number;

  return (
    <button
      onClick={() => openDialog(lectureId)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      <Pencil className="w-3.5 h-3.5" />
      수정
    </button>
  );
}

export const lectureQuizColumns: ColumnDef<AdminLectureForQuiz>[] = [
  {
    accessorKey: "courseId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "lectureId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        강의 제목
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: (info) => (
      <span className="font-medium text-gray-900">{String(info.getValue())}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "lectureNumber",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        회차
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: (info) => (
      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
        {`${info.getValue()}강`}
      </span>
    ),
    enableHiding: false,
  },
  {
    id: "quizCount",
    accessorFn: (row) => ({
      multiple: row.multipleChoiceCount,
      descriptive: row.descriptiveCount,
    }),
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        퀴즈
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: (info) => {
      const quiz = info.getValue() as { multiple: number; descriptive: number };
      return (
        <div className="text-gray-600 text-sm">
          <span className="text-gray-400">객</span> {quiz.multiple}{" "}
          <span className="text-gray-300 mx-1">/</span>
          <span className="text-gray-400">주</span> {quiz.descriptive}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        관리
      </span>
    ),
    cell: (props) => <LectureActionsCell {...props} />,
    enableHiding: false,
  },
];
