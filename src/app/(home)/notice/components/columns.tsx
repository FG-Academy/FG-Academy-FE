"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { PostsResponse } from "../hooks/usePostsQuery";

export const columns: ColumnDef<PostsResponse>[] = [
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
    accessorKey: "announcementId",
    header: ({ column }) => {
      return <div className="text-center text-xs md:text-base">No</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {row.getValue("announcementId")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <div className="text-center text-xs md:text-base">제목</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    id: "author",
    header: ({ column }) => {
      return <div className="text-center text-xs md:text-base">작성자</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center text-xs md:text-base">관리자</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <div className="text-center text-xs md:text-base">작성일자</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs md:text-base">
          {formatDate(new Date(row.getValue("createdAt")))}
        </div>
      );
    },
  },
];
