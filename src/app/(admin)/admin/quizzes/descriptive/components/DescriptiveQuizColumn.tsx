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
    header: () => {
      return <div className="text-center">이름</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "positionLabel",
    header: () => {
      return <div className="text-center">직분</div>;
    },
    cell: ({ row }) => {
      const positionLabel = row.getValue("positionLabel") as string;
      return <div className="text-center">{positionLabel}</div>;
    },
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },

  {
    accessorKey: "departmentLabel",
    header: () => {
      return <div className="text-center">부서</div>;
    },
    cell: ({ row }) => {
      const departmentValue = row.getValue("departmentLabel") as string;
      return <div className="text-center ">{departmentValue}</div>;
    },
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "courseTitle",
    header: () => {
      return <div className="text-center">코스이름</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("courseTitle")}</div>;
    },
    enableHiding: false,
    meta: {
      filterVariant: "select",
    },
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "quizType",
    header: () => {
      return <div className="text-center">퀴즈 유형</div>;
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
    header: () => {
      return <div className="text-center">채점 현황</div>;
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
