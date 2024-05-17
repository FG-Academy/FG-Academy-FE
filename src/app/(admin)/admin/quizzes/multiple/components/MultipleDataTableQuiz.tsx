"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
// import { DataTablePagination } from "./DataTablePagination";
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
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import MultipleQuizInfoDialog from "./MultipleQuizInfoDialog";
import useOpenMultipleDialogStore from "@/store/useOpenMultipleDialogStore";
import { DataTablePagination } from "../../../users/components/DataTablePagination";
import { Search } from "lucide-react";
import DebouncedInput from "../../../users/components/DebouncedInput";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function MultipleDataTableQuiz<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { setOpen, open } = useOpenMultipleDialogStore((state) => state);

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
        userId: false,
        quizId: false,
        level: false,
        courseTitle: false,
      },
    },
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        <div className="flex flex-col justify-start overflow-y-auto">
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[900px] h-full flex flex-col justify-between"
          >
            <DialogHeader>
              <DialogTitle>사용자 퀴즈 상세정보</DialogTitle>
              <DialogDescription>
                사용자가 제출한 퀴즈 상세정보를 확인합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="flex h-full w-full items-center p-2 overflow-y-auto">
              <MultipleQuizInfoDialog />
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
          <div className="relative flex items-center justify-start flex-1 w-full h-full mb-6 mr-auto md:grow-0">
            <Search className="absolute z-10 w-6 h-6 top-1 left-2 text-muted-foreground" />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              type="search"
              placeholder="검색..."
              className="w-full py-1 rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px] shadow border border-block"
            />
          </div>
          <Table className="container relative justify-start py-2 mx-auto overflow-y-auto">
            <TableHeader className="sticky top-0 bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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
        </div>
        <DataTablePagination table={table} />
      </div>
    </Dialog>
  );
}
