"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "../../../components/SortingHeader";
import { Department, Position } from "@/app/(home)/userInfo/types/type";
// import { Department, Position } from "@/app/(home)/signup/types/type";

import { XIcon, CheckIcon } from "@/app/(home)/myDashboard/components/svg";
import { Lecture } from "@/model/lecture";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import useIdForQuizStore from "@/store/useIdForQuiz";

export const RegisterQuizColumn: ColumnDef<Lecture>[] = [
  // {
  //   accessorKey: "lectureId",
  //   cell: (info) => info.getValue(),
  //   enableHiding: true,
  // },
  {
    accessorKey: "courseId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="이름" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          강의 제목
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const result = info.getValue();
      return result;
    },
    enableHiding: false,
  },

  {
    accessorKey: "lectureNumber",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의 회차" />;
    },
    cell: (info) => {
      return <div className="ml-10">{`${info.getValue()}강`}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "lectureId",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의 회차" />;
    },
    cell: ({ row }) => {
      const { setOpen } = useOpenDialogStore((state) => state);
      const { setLectureId, setCourseId } = useIdForQuizStore((state) => state);

      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => {
            setLectureId(parseInt(row.getValue("lectureId")));
            setCourseId(parseInt(row.getValue("courseId")));
            setOpen(true);
          }}
        >
          <div>수정하기</div>
        </Button>
      );
    },
    enableHiding: false,
  },

  //   {
  //     accessorKey: "correctedRate",
  //     header: () => {
  //       return <div>정답률</div>;
  //     },
  //     cell: (info) => {
  //       const rate = Math.round(info.getValue() as number);

  //       return `${rate}%`;
  //     },
  //   },

  // {
  //   accessorKey: "submittedDate",
  // header: ({ column }) => {
  //   return <SortingHeader column={column} title="제출일자" />;
  // },
  //   cell: ({ row }) => {
  //     return <div>{formatDate(new Date(row.getValue("submittedDate")))}</div>;
  //   },
  //   enableHiding: false,
  // },
];
