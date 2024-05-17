"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "../../../components/SortingHeader";
import { departments, positions } from "@/app/types/type";
import useOpenDescriptiveDialogStore from "@/store/useOpenDescriptiveDialogStore";
import { QuizSubmitResponse } from "../hooks/useQuizSubmitQuery";

export const DescriptiveQuizColumn: ColumnDef<QuizSubmitResponse>[] = [
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
    header: ({ column }) => {
      return <SortingHeader column={column} title="레벨" />;
    },
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이름
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return <SortingHeader column={column} title="직분" />;
    },
    cell: ({ row }) => {
      const positionValue = row.getValue("position");
      const positionLabel =
        positions.find((pos) => pos.value === positionValue)?.label || "N/A";
      return <div className="text-center">{positionLabel}</div>;
    },
    enableHiding: false,
  },

  {
    accessorKey: "departmentName",
    header: ({ column }) => {
      return <SortingHeader column={column} title="부서" />;
    },
    cell: ({ row }) => {
      const departmentValue = row.getValue("departmentName");
      const departmentLabel =
        departments.find((dept) => dept.value === departmentValue)?.label ||
        "N/A";
      return <div className="text-center ">{departmentLabel}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "courseTitle",
    header: ({ column }) => {
      return <SortingHeader column={column} title="코스 이름" />;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("courseTitle")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "lectureTitle",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의 이름" />;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("lectureTitle")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortingHeader column={column} title="채점 현황" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const result = status === 0 ? "미채점" : status === 1 ? "정답" : "오답";
      return <div className="text-center">{result}</div>;
    },
    enableHiding: false,
  },
  {
    id: "button",
    cell: ({ row }) => {
      const { setOpen, setUserId, setQuizId } = useOpenDescriptiveDialogStore(
        (state) => state
      );
      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => {
            setUserId(parseInt(row.getValue("userId")));
            setOpen(true);
            setQuizId(parseInt(row.getValue("quizId")));
          }}
        >
          채점 하기
        </Button>
      );
    },
    enableHiding: false,
  },

  // {
  //   accessorKey: "submittedDate",
  //   header: ({ column }) => {
  //     return <SortingHeader column={column} title="제출일자" />;
  //   },
  //   cell: ({ row }) => {
  //     return <div>{formatDate(new Date(row.getValue("submittedDate")))}</div>;
  //   },
  //   enableHiding: false,
  // },
];
