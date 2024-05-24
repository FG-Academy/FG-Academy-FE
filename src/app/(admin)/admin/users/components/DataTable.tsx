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
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
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
import { DataTablePagination } from "./DataTablePagination";
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
import { Search } from "lucide-react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { UserInfoDialog } from "./UserInfoDialog";
import DebouncedInput from "./DebouncedInput";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import Filter from "../../quizzes/descriptive/components/Filter";

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
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [userId, setUserId] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { open, setOpen } = useOpenDialogStore((state) => state);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: fuzzyFilter,
    initialState: {
      columnVisibility: {
        birthDate: false,
        userId: false,
        email: false,
        phoneNumber: false,
      },
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      // rowSelection,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        <div className="flex flex-col justify-start overflow-y-auto">
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[600px] h-[646px] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle>유저 관리</DialogTitle>
              <DialogDescription>유저 정보를 수정합니다.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <UserInfoDialog userId={userId} />
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
              <Button type="submit" form="userInfoDialog">
                수정하기
              </Button>
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
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
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
                    onClick={() => {
                      setUserId(row.getValue("userId"));
                      setOpen(true);
                    }}
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
