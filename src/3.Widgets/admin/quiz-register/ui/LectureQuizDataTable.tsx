"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import { rankItem, RankingInfo } from "@tanstack/match-sorter-utils";
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
import { DataTablePagination, SearchInput } from "@/6.shared/ui/admin";
import type { AdminLectureForQuiz } from "@/5.entities/admin/quiz";
import { useQuizRegisterDialogStore } from "@/4.features/admin/manage-quiz";
import { QuizListDialog } from "./QuizListDialog";
import { cn } from "@/6.shared/lib";

declare module "@tanstack/react-table" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<AdminLectureForQuiz> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

interface LectureQuizDataTableProps {
  columns: ColumnDef<AdminLectureForQuiz>[];
  data: AdminLectureForQuiz[];
}

export function LectureQuizDataTable({
  columns,
  data,
}: LectureQuizDataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { open, setOpen } = useQuizRegisterDialogStore();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    initialState: {
      columnVisibility: {
        courseId: false,
        lectureId: false,
      },
    },
    state: {
      globalFilter,
      sorting,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <SearchInput
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="강의 검색..."
              className="max-w-xs"
            />
            <div className="text-sm text-gray-500">
              총 {table.getFilteredRowModel().rows.length}개 강의
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "px-4 py-3 text-sm text-gray-700",
                          "cursor-pointer"
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4">
          <DataTablePagination table={table} pagination={pagination} />
        </div>
      </div>

      {/* Quiz List Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[600px] max-h-[80vh] overflow-y-auto bg-white"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              강의 등록 퀴즈 현황
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              강의별 등록된 퀴즈들을 확인합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <QuizListDialog />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
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
