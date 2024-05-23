"use client";

import { formatDate } from "@/lib/utils";
import { IUser } from "@/model/user";
import { ColumnDef } from "@tanstack/react-table";
import { SortingHeader } from "./SortingHeader";
import { departments, positions } from "@/app/types/type";
import { User } from "../../hooks/useUserQuery";

export const columns: ColumnDef<User>[] = [
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
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "yearsOfService",
    header: ({ column }) => {
      return <SortingHeader column={column} title="근속년수" />;
    },
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "positionLabel",
    header: ({ column }) => {
      return <SortingHeader column={column} title="직급" />;
    },
    cell: ({ row }) => {
      const positionLabel = row.getValue("positionLabel") as string;
      // const positionLabel =
      //   positions.find((pos) => pos.value === positionValue)?.label || "N/A";

      return <div>{positionLabel}</div>;
    },
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "departmentLabel",
    header: ({ column }) => {
      return <SortingHeader column={column} title="부서" />;
    },
    cell: ({ row }) => {
      const departmentLabel = row.getValue("departmentLabel") as string;
      // const departmentLabel =
      //   departments.find((dept) => dept.value === departmentValue)?.label ||
      //   "N/A";
      return <div>{departmentLabel}</div>;
    },
    meta: {
      filterVariant: "select",
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
    meta: {
      filterVariant: "select",
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
    meta: {
      filterVariant: "text",
    },
  },
];
