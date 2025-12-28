"use client";

import { Dispatch, SetStateAction } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shadcn/ui/table";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/6.shared/ui/shadcn/ui/dialog";
import { DataTablePagination } from "@/6.shared/ui/admin";
import type { AdminQuizSubmission } from "@/5.entities/admin/quiz";
import {
  QuizGradingDialog,
  useQuizGradingDialogStore,
} from "@/4.features/admin/manage-quiz";

interface QuizSubmissionsDataTableProps {
  totalPages: number;
  columns: ColumnDef<AdminQuizSubmission>[];
  data: AdminQuizSubmission[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function QuizSubmissionsDataTable({
  totalPages,
  columns,
  data,
  pagination,
  setPagination,
}: QuizSubmissionsDataTableProps) {
  const { open, setOpen } = useQuizGradingDialogStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    pageCount: totalPages,
    state: {
      pagination,
    },
    initialState: {
      columnVisibility: {
        userId: false,
        quizId: false,
        level: false,
      },
    },
    defaultColumn: {
      size: 100,
      minSize: 50,
      maxSize: 500,
    },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-gray-50 hover:bg-gray-50"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 px-4 border-b border-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-gray-500"
                  >
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200">
          <DataTablePagination table={table} pagination={pagination} />
        </div>
      </div>

      {/* Quiz Grading Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-xl max-h-[85vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>퀴즈 상세 정보</DialogTitle>
            <DialogDescription>
              사용자가 제출한 퀴즈 정보를 확인하고 채점할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <QuizGradingDialog />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-gray-200"
              >
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
