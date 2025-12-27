"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/5.entities/admin/user";

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "departmentName",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "position",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: () => {
      return <div className="text-center">이름</div>;
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "level",
    header: () => {
      return <div className="text-center">레벨</div>;
    },
  },
  {
    accessorKey: "yearsOfService",
    header: () => {
      return <div className="text-center">근속년수</div>;
    },
  },
  {
    accessorKey: "positionLabel",
    header: () => {
      return <div className="text-center">직분</div>;
    },
    cell: ({ row }) => {
      const positionLabel = row.getValue("positionLabel") as string;
      return <div>{positionLabel}</div>;
    },
  },
  {
    accessorKey: "departmentLabel",
    header: () => {
      return <div className="text-center">부서</div>;
    },
    cell: ({ row }) => {
      const departmentLabel = row.getValue("departmentLabel") as string;
      return <div>{departmentLabel}</div>;
    },
  },
  {
    accessorKey: "churchName",
    header: () => {
      return <div className="text-center">교회</div>;
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
    header: () => {
      return <div className="text-center">가입일자</div>;
    },
    cell: ({ row }) => {
      return <div>{formatDate(new Date(row.getValue("createdAt")))}</div>;
    },
  },
];
