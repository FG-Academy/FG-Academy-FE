"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shadcn/ui/table";
import { Dispatch, SetStateAction, useState } from "react";
import { DataTablePagination } from "@/6.shared/ui/admin";
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
import { UserInfoDialogContent } from "./UserInfoDialogContent";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import type { User } from "@/5.entities/user";
import { Department, Position } from "@/5.entities/user";

interface UserDataTableProps<TData, TValue> {
  totalPages: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function UserDataTable<TData, TValue>({
  totalPages,
  columns,
  data,
  pagination,
  setPagination,
}: UserDataTableProps<TData, TValue>) {
  const [userId, setUserId] = useState<number>();
  const [userProfile, setUserProfile] = useState<Partial<User>>({
    userId: 0,
    birthDate: "",
    name: "",
    email: "",
    phoneNumber: "",
    churchName: "fg",
    departmentName: Department.ETC,
    position: Position.ETC,
    yearsOfService: 0,
    level: "",
  });

  const { open, setOpen } = useOpenDialogStore((state) => state);

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
        birthDate: false,
        userId: false,
        email: false,
        phoneNumber: false,
        departmentName: false,
        position: false,
      },
    },
    onPaginationChange: setPagination,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-h-[85vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>유저 정보 수정</DialogTitle>
            <DialogDescription>
              유저 정보를 확인하고 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <UserInfoDialogContent userId={userId!} userProfile={userProfile} />
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-gray-200"
              >
                닫기
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="userInfoDialog"
              className="bg-gray-900 hover:bg-gray-800"
            >
              수정하기
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-gray-50 hover:bg-gray-50"
                >
                  {headerGroup.headers.map((header) => {
                    return (
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
                      setUserProfile({
                        userId: row.getValue("userId"),
                        birthDate: row.getValue("birthDate"),
                        name: row.getValue("name"),
                        email: row.getValue("email"),
                        phoneNumber: row.getValue("phoneNumber"),
                        churchName: row.getValue("churchName"),
                        departmentName: row.getValue("departmentName"),
                        position: row.getValue("position"),
                        yearsOfService: row.getValue("yearsOfService"),
                        level: row.getValue("level"),
                      });
                      setUserId(row.getValue("userId"));
                      setOpen(true);
                    }}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
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
        <DataTablePagination table={table} pagination={pagination} />
      </div>
    </Dialog>
  );
}
