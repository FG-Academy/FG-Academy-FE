"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/6.shared/lib/utils";
import type { QuestionListItem } from "@/5.entities/question";

export const questionColumns: ColumnDef<QuestionListItem>[] = [
  {
    accessorKey: "questionId",
    header: () => {
      return <div className="text-center text-xs md:text-base">No</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {row.getValue("questionId")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => {
      return <div className="text-center text-xs md:text-base">제목</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return <div className="text-center text-xs md:text-base">작성일자</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {formatDate(new Date(row.getValue("createdAt")))}
        </div>
      );
    },
  },
];
