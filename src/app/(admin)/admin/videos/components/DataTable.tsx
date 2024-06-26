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
  ColumnResizeMode,
  ColumnSizing,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import DebouncedInput from "../../users/components/DebouncedInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DataTablePagination } from "./DataTablePagination";
import { CourseTablePagination } from "../../quizzes/register/components/CourseTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isQuizTable?: boolean;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  isQuizTable = false,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    columnResizeDirection: "ltr",
    columnResizeMode: "onChange",
    globalFilterFn: fuzzyFilter,
    initialState: {
      columnVisibility: {
        createdAt: false,
      },
    },
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    defaultColumn: {},
  });

  return (
    <div className="flex flex-col justify-between flex-1 overflow-y-auto">
      <div className="flex flex-col justify-start overflow-y-auto">
        {!isQuizTable && (
          <div className="relative flex items-center justify-between flex-1 w-full h-full mb-6 mr-auto md:grow-0">
            <div>
              <Search className="absolute z-10 w-6 h-6 top-1 left-2 text-muted-foreground" />
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                type="search"
                placeholder="검색..."
                className="w-full py-1 rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px] shadow border border-block"
              />
            </div>
            <Button
              className="bg-blue-700"
              onClick={() => {
                router.push("/admin/videos/register");
              }}
            >
              새 강의 추가
              <Plus className="w-4 h-4 ml-2 text-white" />
            </Button>
          </div>
        )}
        <Table
          className={`relative container w-[${table.getCenterTotalSize()}px] justify-start mx-auto py-2 overflow-y-auto`}
        >
          <TableHeader className="sticky top-0 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      // style={{ width: `${header.getSize()}px` }}
                      className={`w-[${header.getSize()}px]`}
                    >
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
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        className={`w-[${cell.column.getSize()}px]`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
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
      {isQuizTable ? (
        <div className="flex justify-end">
          <CourseTablePagination table={table} />
        </div>
      ) : (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}
