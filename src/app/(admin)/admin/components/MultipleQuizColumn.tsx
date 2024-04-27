"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "./SortingHeader";
import { Department, Position } from "@/app/(home)/userInfo/types/type";
// import { Department, Position } from "@/app/(home)/signup/types/type";
import { AdminQuizInfo, IAdminQuizData } from "@/model/adminQuiz";
import { XIcon, CheckIcon } from "@/app/(home)/myDashboard/components/svg";

const departments = [
  { value: Department.FETAL, label: "태아부" },
  { value: Department.INFANT, label: "영아부" },
  { value: Department.TODDLER, label: "유아부" },
  { value: Department.KINDERGARTEN, label: "유치부" },
  { value: Department.ELEMENTARYYOUNG, label: "유년부" },
  { value: Department.ELEMENTARY, label: "초등부" },
  { value: Department.JUNIOR, label: "소년부" },
  { value: Department.MIDDLE, label: "중등부" },
  { value: Department.MIDDLEHIGH, label: "중고등부" },
  { value: Department.HIGH, label: "고등부" },
  { value: Department.GONGREUNGYOUNGKINDER, label: "공릉영유치부" },
  { value: Department.GONGREUNGELEMENTARYYOUNG, label: "공릉유년부" },
  { value: Department.GONGREUNGELEMENTARY, label: "공릉초등부" },
  { value: Department.GONGREUNGMIDDLE, label: "공릉중등부" },
  { value: Department.GONGREUNGHIGH, label: "공릉고등부" },
  { value: Department.ENGLISHYOUNGKINDER, label: "영어영유치부" },
  { value: Department.ENGLISHELEMENTARYYOUNG, label: "영어유년부" },
  { value: Department.ENGLISHELEMENTARY, label: "영어초등부" },
  { value: Department.ENGLISHMIDDLEHIGH, label: "영어중고등부" },
  { value: Department.LOVE, label: "사랑부" },
  { value: Department.YOUTH, label: "청년부" },
  { value: Department.ETC, label: "기타" },
];

const positions = [
  { value: Position.PASTOR, label: "목사" },
  { value: Position.EVANGELIST, label: "전도사" },
  { value: Position.ELDER, label: "장로" },
  { value: Position.TEACHER, label: "교사" },
  { value: Position.ETC, label: "기타" },
];

export const MultipleQuizColumn: ColumnDef<IAdminQuizData>[] = [
  {
    accessorKey: "userId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="이름" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이름
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
    accessorKey: "postion",
    header: () => {
      return <div>직분</div>;
    },
    cell: ({ row }) => {
      const positionValue = row.getValue("position");
      const positionLabel =
        positions.find((pos) => pos.value === positionValue)?.label || "N/A";
      return <div>{positionLabel}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "courseTitle",
    cell: (info) => info.getValue(),
    enableHiding: true,
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
      return <div>{positionLabel}</div>;
    },
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
    accessorKey: "department",
    header: ({ column }) => {
      return <SortingHeader column={column} title="부서" />;
    },
    cell: ({ row }) => {
      const departmentValue = row.getValue("department");
      const departmentLabel =
        departments.find((dept) => dept.value === departmentValue)?.label ||
        "N/A";
      return <div>{departmentLabel}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "correctedRate",
    header: () => {
      return <div>정답률</div>;
    },
    cell: (info) => {
      const rate = Math.round(info.getValue() as number);

      return `${rate}%`;
    },
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
