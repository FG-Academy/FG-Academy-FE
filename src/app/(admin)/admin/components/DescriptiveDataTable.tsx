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
// import { UserInfoDialog } from "./UserInfoDialog";
// import DebouncedInput from "./DebouncedInput";
import { IAdminQuizData } from "@/model/adminQuiz";
import DescriptiveQuizInfoDialog from "./DescriptiveQuizInfoDialog";
import useOpenDescriptiveDialogStore from "@/store/useOpenDescriptiveDialogStore";

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

export function DescriptiveDataTableQuiz<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [userId, setUserId] = useState(0);
  const [quizInfo, setQuizInfo] = useState<IAdminQuizData | undefined>();

  const { open, setOpen } = useOpenDescriptiveDialogStore((state) => state);

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
        position: false,
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
        <div className="flex flex-col justify-start overflow-y-scroll">
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
              <DescriptiveQuizInfoDialog userId={userId} type={"descriptive"} />
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
          <div className="relative justify-start items-center w-full h-full flex mr-auto flex-1 md:grow-0 mb-6"></div>
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
                      //   setQuizInfo({
                      //     userId: row.getValue("userId"),
                      //     name: row.getValue("name"),
                      //     birthDate: row.getValue("birthDate"),
                      //     email: row.getValue("email"),
                      //     phoneNumber: row.getValue("phoneNumber"),
                      //     churchName: row.getValue("churchName"),
                      //     departmentName: row.getValue("departmentName"),
                      //     position: row.getValue("position"),
                      //     yearsOfService: row.getValue("yearsOfService"),
                      //   });
                      // setOpen(true);
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
                    <TableRow>
                      <Button
                        className="mt-2 hover:bg-gray-300"
                        variant="secondary"
                        onClick={() => {
                          setUserId(parseInt(row.getValue("userId")));
                          console.log(userId);
                          setOpen(true);
                        }}
                      >
                        채점현황
                      </Button>
                    </TableRow>
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
        {/* <DataTablePagination table={table} /> */}
      </div>
    </Dialog>
  );
}
