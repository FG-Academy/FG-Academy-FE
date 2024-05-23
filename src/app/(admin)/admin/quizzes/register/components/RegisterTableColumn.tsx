"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "../../../components/SortingHeader";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import useIdForQuizStore from "@/store/useIdForQuiz";
import { AllLecturesResponse } from "@/hooks/useLectureQuery";

export const RegisterQuizColumn: ColumnDef<AllLecturesResponse>[] = [
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
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의 제목" />;
    },
    cell: (info) => {
      return <div className="text-left">{`${info.getValue()}`}</div>;
    },
    enableHiding: false,
  },

  {
    accessorKey: "lectureNumber",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의 회차" />;
    },
    cell: (info) => {
      return <div className="text-left">{`${info.getValue()}강`}</div>;
    },
    enableHiding: false,
  },
  {
    id: "button",
    cell: ({ row }) => {
      const { setOpen } = useOpenDialogStore((state) => state);
      const { setLectureId } = useIdForQuizStore((state) => state);

      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => {
            setLectureId(parseInt(row.getValue("lectureId")));
            setOpen(true);
          }}
        >
          <div>수정하기</div>
        </Button>
      );
    },
    enableHiding: false,
  },
];
