"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { IUser } from "@/model/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SortingHeader } from "./SortingHeader";
import {
  Department,
  departments,
  Position,
  positions,
} from "@/app/(home)/userInfo/types/type";
import { useMemo } from "react";

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
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      console.log(row.getValue("createdAt"));
      return <div>{formatDate(new Date(row.getValue("createdAt")))}</div>;
    },
  },
];
