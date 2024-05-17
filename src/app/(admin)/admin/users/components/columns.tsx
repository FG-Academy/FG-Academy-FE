"use client";

import { formatDate } from "@/lib/utils";
import { IUser } from "@/model/user";
import { ColumnDef } from "@tanstack/react-table";
import { SortingHeader } from "./SortingHeader";
import { departments, positions } from "@/app/types/type";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "userId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "email",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "birthDate",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="이름" />
        <SortingHeader column={column} title="이름" />
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return <SortingHeader column={column} title="레벨" />;
    },
  },
  {
    accessorKey: "yearsOfService",
    header: ({ column }) => {
      return <SortingHeader column={column} title="근속년수" />;
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return <SortingHeader column={column} title="직급" />;
    },
    cell: ({ row }) => {
      const positionValue = row.getValue("position");
      const positionLabel =
        positions.find((pos) => pos.value === positionValue)?.label || "N/A";

      return <div>{positionLabel}</div>;
    },
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
      return <div>{departmentLabel}</div>;
    },
  },
  {
    accessorKey: "churchName",
    header: ({ column }) => {
      return <SortingHeader column={column} title="교회" />;
    },
    cell: ({ row }) => {
      const churchValue = row.getValue("churchName");
      const churchLabel =
        churchValue === "fg"
          ? "꽃동산교회"
          : churchValue === "others"
          ? "타교회"
          : "정보 없음";
      return <div>{churchLabel}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <SortingHeader column={column} title="가입일자" />;
    },
    cell: ({ row }) => {
      return <div>{formatDate(new Date(row.getValue("createdAt")))}</div>;
    },
  },
];
