"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { IUser } from "@/model/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Department, Position } from "@/app/(home)/signup/types/type";
import { SortingHeader } from "../../users/components/SortingHeader";

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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="이름" />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이미지
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의명" />;
    },
  },
  {
    accessorKey: "numberOfPerson",
    header: ({ column }) => {
      return <SortingHeader column={column} title="수강인원" />;
    },
  },
  {
    accessorKey: "question",
    header: ({ column }) => {
      return <SortingHeader column={column} title="질문" />;
    },
    cell: ({ row }) => {},
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortingHeader column={column} title="상태" />;
    },
    cell: ({ row }) => {},
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <SortingHeader column={column} title="관리" />;
    },
    cell: ({ row }) => {},
  },
  {
    accessorKey: "period",
    header: ({ column }) => {
      return <SortingHeader column={column} title="수강 기간" />;
    },
    cell: ({ row }) => {
      return <div>{formatDate(new Date(row.getValue("createdAt")))}</div>;
    },
  },
];
