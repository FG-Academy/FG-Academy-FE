"use client";

import { formatDate } from "@/6.shared/lib";
import { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/5.entities/admin/user";
import { StatusBadge } from "@/6.shared/ui/admin";

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
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        이름
      </span>
    ),
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: "level",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        레벨
      </span>
    ),
    cell: ({ row }) => {
      const level = row.getValue("level") as string;
      const variant =
        level === "admin" ? "info" : level === "tutor" ? "warning" : "default";
      const label =
        level === "admin"
          ? "관리자"
          : level === "tutor"
          ? "튜터"
          : level === "manager"
          ? "매니저"
          : "일반";
      return <StatusBadge variant={variant}>{label}</StatusBadge>;
    },
  },
  {
    accessorKey: "yearsOfService",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        근속년수
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.getValue("yearsOfService")}년
      </span>
    ),
  },
  {
    accessorKey: "positionLabel",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        직분
      </span>
    ),
    cell: ({ row }) => {
      const positionLabel = row.getValue("positionLabel") as string;
      return <span className="text-gray-600">{positionLabel}</span>;
    },
  },
  {
    accessorKey: "departmentLabel",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        부서
      </span>
    ),
    cell: ({ row }) => {
      const departmentLabel = row.getValue("departmentLabel") as string;
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
          {departmentLabel}
        </span>
      );
    },
  },
  {
    accessorKey: "churchName",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        교회
      </span>
    ),
    cell: ({ row }) => {
      const churchValue = row.getValue("churchName");
      const churchLabel =
        churchValue === "fg"
          ? "꽃동산교회"
          : churchValue === "others"
          ? "타교회"
          : "정보 없음";
      return <span className="text-gray-600">{churchLabel}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        가입일자
      </span>
    ),
    cell: ({ row }) => {
      return (
        <span className="text-gray-500 text-sm">
          {formatDate(new Date(row.getValue("createdAt")))}
        </span>
      );
    },
  },
];
