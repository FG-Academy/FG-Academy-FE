"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import type { AdminCourse } from "@/5.entities/admin/course";

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
    accessorKey: "createdAt",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "thumbnailImagePath",
    header: () => <div className="text-center">이미지</div>,
    cell: ({ row }) => {
      return (
        <Image
          className="rounded-md"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${row.getValue(
            "thumbnailImagePath"
          )}`}
          style={{ width: "100%", height: "auto" }}
          alt="강의 썸네일"
          priority
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">강의명</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center w-full whitespace-normal break-words">
          {row.getValue("title")}
        </div>
      );
    },
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "enrollmentCount",
    header: () => <div className="text-center">총 수강생</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("enrollmentCount")}</div>
      );
    },
  },
  {
    accessorKey: "category.name",
    accessorFn: (row) => row.category.name,
    header: () => <div className="text-center">카테고리</div>,
    cell: (info) => {
      return <div className="text-center">{info.getValue() as string}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">상태</div>,
    cell: ({ row }) => {
      const statusValue = row.getValue("status");

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
      return <div className="text-center">{statusLabel}</div>;
    },
  },
  {
    accessorKey: "finishDate",
    header: () => <div className="text-center">마감 기한</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {formatDate(new Date(row.getValue("finishDate")))}
        </div>
      );
    },
  },
  {
    id: "quizCount",
    accessorFn: (row) => `객${row.multipleCount}/주${row.descriptiveCount}`,
    header: () => <div className="text-center">퀴즈갯수</div>,
    cell: (info) => {
      return <div className="text-center">{info.getValue() as string}</div>;
    },
  },
  {
    accessorKey: "courseId",
    header: () => <div className="text-center">관리</div>,
    cell: ({ row }) => {
      return (
        <Link href={`/admin/courses/edit?cid=${row.getValue("courseId")}`}>
          <Button
            variant="ghost"
            className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          >
            <Pencil className="w-4 h-4" color="blue" />
            <div>수정하기</div>
          </Button>
        </Link>
      );
    },
  },
];
