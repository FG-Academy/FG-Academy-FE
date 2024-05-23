"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "../../../components/SortingHeader";
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
    size: 100,
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
    accessorKey: "positionLabel",
    header: ({ column }) => {
      return <SortingHeader column={column} title="직분" />;
    },
    cell: ({ row }) => {
      const positionLabel = row.getValue("positionLabel") as string;
      return <div className="text-center">{positionLabel}</div>;
    },
    enableHiding: false,
  },

  {
    accessorKey: "departmentLabel",
    header: ({ column }) => {
      return <SortingHeader column={column} title="부서" />;
    },
    cell: ({ row }) => {
      const departmentValue = row.getValue("departmentLabel") as string;
      return <div className="text-center ">{departmentValue}</div>;
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
  // {
  //   accessorKey: "lectureTitle",
  //   header: ({ column }) => {
  //     return <SortingHeader column={column} title="강의 이름" />;
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center">{row.getValue("lectureTitle")}</div>;
  //   },
  //   enableHiding: false,
  // },
  {
    accessorKey: "quizType",
    header: ({ column }) => {
      return <SortingHeader column={column} title="퀴즈 유형" />;
    },
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
    header: ({ column }) => {
      return <SortingHeader column={column} title="채점 현황" />;
    },
    cell: ({ row }) => {
      const answerType = row.getValue("answerType") as string;
      // Define a function to return the appropriate class based on answerType
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
        <div className={`text-center ${getColorClass(answerType)}`}>
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
    id: "button",
    cell: ({ row }) => {
      const { setOpen, setUserId, setQuizId } = useOpenDescriptiveDialogStore(
        (state) => state
      );
      const quizType = row.getValue("quizType") as string;
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
          {quizType === "주관식" ? "채점하기" : "상세보기"}
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
