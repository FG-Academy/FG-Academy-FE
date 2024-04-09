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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, Search } from "lucide-react";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { UserInfoDialog } from "./UserInfoDialog";
import DebouncedInput from "./DebouncedInput";
import useOpenDialogStore from "@/store/useOpenDialogStore";

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

interface User {
  userId: number;
  name: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  departmentName: string;
  position: string;
  yearsOfService: number;
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

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [userInfo, setUserInfo] = useState<User | undefined>();

  const { open, setOpen } = useOpenDialogStore((state) => state);

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
        birthDate: false,
        userId: false,
        email: false,
        phoneNumber: false,
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
      <div className="flex flex-col flex-1 justify-between overflow-y-auto">
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
              <UserInfoDialog userInfo={userInfo as User} />
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" form="userInfoDialog">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
          <div className="relative justify-start items-center w-full h-full flex mr-auto flex-1 md:grow-0 mb-6">
            <Search className="z-10 absolute top-1 left-2 h-6 w-6 text-muted-foreground" />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              type="search"
              placeholder="검색..."
              className="w-full py-1 rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px] shadow border border-block"
            />
          </div>
          <Table className="relative container justify-start mx-auto py-2 overflow-y-auto">
            <TableHeader className="sticky top-0 bg-white">
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
                    onClick={() => {
                      setUserInfo({
                        userId: row.getValue("userId"),
                        name: row.getValue("name"),
                        birthDate: row.getValue("birthDate"),
                        email: row.getValue("email"),
                        phoneNumber: row.getValue("phoneNumber"),
                        churchName: row.getValue("churchName"),
                        departmentName: row.getValue("departmentName"),
                        position: row.getValue("position"),
                        yearsOfService: row.getValue("yearsOfService"),
                      });
                      // setUserId(parseInt(row.getValue("userId")));
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
