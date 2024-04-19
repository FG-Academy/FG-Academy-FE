"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { SortingHeader } from "../../users/components/SortingHeader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { MainCoursesResponse } from "@/hooks/useCourseQuery";

export const videoColumns: ColumnDef<MainCoursesResponse>[] = [
  {
    accessorKey: "createdAt",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "thumbnailImagePath",
    header: ({ column }) => {
      return <SortingHeader column={column} title="이미지" />;
    },
    cell: ({ row }) => {
      // console.log(row.getValue("thumbnailImagePath"));
      return (
        <Image
          className="rounded-md"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_API_URL}${row.getValue(
            "thumbnailImagePath"
          )}`}
          alt="강의 썸네일"
          priority
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortingHeader column={column} title="강의명" />;
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "enrollmentCount",
    header: ({ column }) => {
      return <SortingHeader column={column} title="총 수강생" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("enrollmentCount")}</div>
      );
    },
    // cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <SortingHeader column={column} title="카테고리" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortingHeader column={column} title="상태" />;
    },
    cell: ({ row }) => {
      // status 값을 row에서 가져옵니다.
      const statusValue = row.getValue("status");

      // status 값에 따라 다른 레이블을 설정합니다.
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
          statusLabel = "알 수 없음"; // 정의되지 않은 status 값에 대한 처리
      }
      return <div className="text-center">{statusLabel}</div>;
    },
  },
  {
    accessorKey: "finishDate",
    header: ({ column }) => {
      return <SortingHeader column={column} title="마감 기한" />;
    },
    cell: ({ row }) => {
      return <div>{formatDate(new Date(row.getValue("finishDate")))}</div>;
    },
  },
  {
    accessorKey: "courseId",
    header: ({ column }) => {
      return <SortingHeader column={column} title="관리" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/admin/videos/edit?cid=${row.getValue("courseId")}`}>
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
