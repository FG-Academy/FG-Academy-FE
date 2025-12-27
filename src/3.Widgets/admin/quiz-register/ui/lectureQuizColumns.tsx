"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { AdminLectureForQuiz } from "@/5.entities/admin/quiz";
import { useQuizRegisterDialogStore } from "@/4.features/admin/manage-quiz";

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
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        강의 제목
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="text-left">{String(info.getValue())}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "lectureNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        강의 회차
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="text-left">{`${info.getValue()}강`}</div>,
    enableHiding: false,
  },
  {
    id: "quizCount",
    accessorFn: (row) =>
      `객${row.multipleChoiceCount}/주${row.descriptiveCount}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        퀴즈갯수
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="text-left">{info.getValue() as string}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { openDialog } = useQuizRegisterDialogStore();
      const lectureId = row.getValue("lectureId") as number;

      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => openDialog(lectureId)}
        >
          수정하기
        </Button>
      );
    },
    enableHiding: false,
  },
];
