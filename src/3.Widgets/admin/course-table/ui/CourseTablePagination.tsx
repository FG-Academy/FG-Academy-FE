"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Copy, Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6.shared/ui/shadcn/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/6.shared/ui/shadcn/ui/alert-dialog";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import {
  useDeleteCoursesMutation,
  useCopyCoursesMutation,
} from "@/4.features/admin/manage-course";
import { cn } from "@/6.shared/lib";

interface CourseTablePaginationProps<TData> {
  table: Table<TData>;
}

export function CourseTablePagination<TData>({
  table,
}: CourseTablePaginationProps<TData>) {
  const { mutate: deleteMutate } = useDeleteCoursesMutation();
  const { mutate: copyMutate } = useCopyCoursesMutation();

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  const deleteSelectedRows = async () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.getValue("courseId") as number);

    try {
      deleteMutate(selectedRowIds);
      table.setRowSelection({});
    } catch (error) {
      toast({
        variant: "destructive",
        title: "요청이 불안정합니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Failed to delete courses:", error);
    }
  };

  const copySelectedRows = async () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.getValue("courseId") as number);

    try {
      copyMutate(selectedRowIds);
      table.setRowSelection({});
    } catch (error) {
      toast({
        variant: "destructive",
        title: "요청이 불안정합니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Failed to copy courses:", error);
    }
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white">
      {/* Left: Actions */}
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <span className="text-sm text-gray-500 mr-2">
            {selectedCount}개 선택됨
          </span>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={selectedCount <= 0}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                selectedCount > 0
                  ? "text-red-600 bg-red-50 hover:bg-red-100"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              )}
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 코스를 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                코스를 삭제하시면 그와 연관된 강의 영상, 퀴즈 등 모든 정보가
                삭제됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteSelectedRows}
                className="bg-red-600 hover:bg-red-700"
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={selectedCount <= 0}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                selectedCount > 0
                  ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              )}
            >
              <Copy className="w-4 h-4" />
              복사
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>강의를 복사하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                강의를 복사하신 이후에는 강의 제목, 시작/마감일자, 공개여부를
                반드시 수정해주셔야 합니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={copySelectedRows}>
                복사
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Right: Pagination */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">페이지 당</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-16 text-sm">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">{currentPage}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span>{totalPages}</span>
          <span className="text-gray-500 ml-1">페이지</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanPreviousPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">첫 페이지</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanPreviousPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">이전 페이지</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanNextPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">다음 페이지</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanNextPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">마지막 페이지</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
