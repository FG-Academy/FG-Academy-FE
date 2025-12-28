"use client";

import Image from "next/image";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Eye } from "lucide-react";
import { formatDate } from "@/6.shared/lib";
import type { AdminCourse } from "@/5.entities/admin/course";
import { useSelectedCourseStore } from "@/4.features/admin/manage-quiz";
import { StatusBadge, getCourseStatusVariant } from "@/6.shared/ui/admin";

// 별도 컴포넌트로 분리하여 Hook 사용
function CourseActionsCell({ row }: CellContext<AdminCourse, unknown>) {
  const { setSelectedCourseId } = useSelectedCourseStore();
  return (
    <Button
      onClick={() => setSelectedCourseId(row.getValue("courseId"))}
      variant="ghost"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      <Eye className="w-3.5 h-3.5" />
      상세보기
    </Button>
  );
}

export const courseForQuizColumns: ColumnDef<AdminCourse>[] = [
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
    cell: ({ row }) => (
      <div className="w-20 h-12 relative overflow-hidden rounded-md bg-gray-100">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${row.getValue(
            "thumbnailImagePath"
          )}`}
          style={{ objectFit: "cover" }}
          alt="강의 썸네일"
          sizes="80px"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        강의명
      </span>
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] font-medium text-gray-900 truncate">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "enrollmentCount",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        수강생
      </span>
    ),
    cell: ({ row }) => (
      <div className="text-gray-600 tabular-nums">
        {row.getValue("enrollmentCount")}명
      </div>
    ),
  },
  {
    id: "categoryName",
    accessorFn: (row) => row.category?.name ?? "-",
    header: () => (
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        카테고리
      </span>
    ),
    cell: (info) => (
      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
        {info.getValue() as string}
      </span>
    ),
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
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatDate(new Date(row.getValue("finishDate")))}
      </div>
    ),
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
    cell: (props) => <CourseActionsCell {...props} />,
  },
];
