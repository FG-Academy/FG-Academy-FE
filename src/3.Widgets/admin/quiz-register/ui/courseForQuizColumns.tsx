"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AdminCourse } from "@/5.entities/admin/course";
import { useSelectedCourseStore } from "@/4.features/admin/manage-quiz";

export const courseForQuizColumns: ColumnDef<AdminCourse>[] = [
  {
    accessorKey: "createdAt",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "thumbnailImagePath",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        이미지
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Image
        className="rounded-md"
        width={100}
        height={100}
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${row.getValue(
          "thumbnailImagePath"
        )}`}
        alt="강의 썸네일"
        priority
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        강의명
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center w-full whitespace-normal break-words">
        {row.getValue("title")}
      </div>
    ),
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "enrollmentCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        총 수강생
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("enrollmentCount")}</div>
    ),
  },
  {
    id: "categoryName",
    accessorFn: (row) => row.category?.name ?? "-",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        카테고리
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="text-center">{info.getValue() as string}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        상태
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      const statusLabel =
        statusValue === "active"
          ? "공개"
          : statusValue === "inactive"
          ? "비공개"
          : statusValue === "temp"
          ? "임시저장"
          : "알 수 없음";
      return <div className="text-center">{statusLabel}</div>;
    },
  },
  {
    accessorKey: "finishDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        마감 기한
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {formatDate(new Date(row.getValue("finishDate")))}
      </div>
    ),
  },
  {
    id: "quizCount",
    accessorFn: (row) => `객${row.multipleCount}/주${row.descriptiveCount}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        퀴즈갯수
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="text-center">{info.getValue() as string}</div>,
  },
  {
    accessorKey: "courseId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        관리
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { setSelectedCourseId } = useSelectedCourseStore();
      return (
        <Button
          onClick={() => setSelectedCourseId(row.getValue("courseId"))}
          variant="ghost"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
        >
          <Pencil className="w-4 h-4" color="blue" />
          <span>상세보기</span>
        </Button>
      );
    },
  },
];
