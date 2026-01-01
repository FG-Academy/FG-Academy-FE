"use client";

import { formatDate, getImageUrl } from "@/6.shared/lib";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/6.shared/ui/shadcn/ui/checkbox";
import { ImageWithFallback } from "@/6.shared/ui";
import type { AdminCourse } from "@/5.entities/admin/course";
import { StatusBadge, getCourseStatusVariant } from "@/6.shared/ui/admin";

export const courseColumns: ColumnDef<AdminCourse>[] = [
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
        className="border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "thumbnailImagePath",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        이미지
      </span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-20 h-12 relative overflow-hidden rounded-md bg-gray-100">
          <ImageWithFallback
            fill
            src={getImageUrl(row.getValue("thumbnailImagePath"))}
            style={{ objectFit: "cover" }}
            alt="강의 썸네일"
            sizes="80px"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        강의명
      </span>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] font-medium text-gray-900 truncate">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "enrollmentCount",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        수강생
      </span>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-gray-600 tabular-nums">
          {row.getValue("enrollmentCount")}명
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    accessorFn: (row) => row.category.name,
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        카테고리
      </span>
    ),
    cell: (info) => {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
          {info.getValue() as string}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        상태
      </span>
    ),
    cell: ({ row }) => {
      const statusValue = row.getValue("status") as string;
      let statusLabel;
      switch (statusValue) {
        case "active":
          statusLabel = "공개";
          break;
        case "inactive":
          statusLabel = "비공개";
          break;
        case "temp":
          statusLabel = "임시저장";
          break;
        default:
          statusLabel = "알 수 없음";
      }
      return (
        <StatusBadge variant={getCourseStatusVariant(statusValue)}>
          {statusLabel}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "finishDate",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        마감일
      </span>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-gray-600 text-sm">
          {formatDate(new Date(row.getValue("finishDate")))}
        </div>
      );
    },
  },
  {
    id: "quizCount",
    accessorFn: (row) => ({ multiple: row.multipleCount, descriptive: row.descriptiveCount }),
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        퀴즈
      </span>
    ),
    cell: ({ row }) => {
      const quiz = row.getValue("quizCount") as { multiple: number; descriptive: number };
      return (
        <div className="text-gray-600 text-sm">
          <span className="text-gray-400">객</span> {quiz.multiple}{" "}
          <span className="text-gray-300 mx-1">/</span>
          <span className="text-gray-400">주</span> {quiz.descriptive}
        </div>
      );
    },
  },
  {
    accessorKey: "courseId",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        관리
      </span>
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/courses/edit?cid=${row.getValue("courseId")}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          수정
        </Link>
      );
    },
  },
];
