"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "./SortingHeader";
import {
  Department,
  Position,
  departments,
  positions,
} from "@/app/(home)/userInfo/types/type";
// import { Department, Position } from "@/app/(home)/signup/types/type";
import { AdminQuizInfo, IAdminQuizData } from "@/model/adminQuiz";
import { XIcon, CheckIcon } from "@/app/(home)/myDashboard/components/svg";

export const DescriptiveQuizColumn: ColumnDef<IAdminQuizData>[] = [
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
