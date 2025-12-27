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
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <div className="flex flex-col overflow-y-auto">
        <Table className="container relative justify-start py-2 mx-auto overflow-y-auto">
          <TableHeader className="sticky top-0 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="cursor-pointer" key={cell.id}>
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
                  className="h-24 text-center"
                >
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} pagination={pagination} />
      </div>

      {/* Quiz Grading Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[600px] h-[646px] overflow-y-scroll"
        >
          <DialogHeader>
            <DialogTitle>사용자 주관식 퀴즈 상세정보</DialogTitle>
            <DialogDescription>
              사용자가 제출한 퀴즈 상세정보를 확인합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <QuizGradingDialog />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
