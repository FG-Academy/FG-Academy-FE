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
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useState } from "react";
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
import { UserInfoDialog } from "./UserInfoDialog";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import { IUser } from "@/model/user";
import { Department, Position } from "@/app/types/type";
import { useDeleteUserMutation } from "../hook/useDeleteUserMutation";

interface DataTableProps<TData, TValue> {
  totalPages: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function DataTable2<TData, TValue>({
  totalPages,
  columns,
  data,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const [userId, setUserId] = useState();
  const [userProfile, setUserProfile] = useState<Partial<IUser>>({
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
      <div className="flex flex-col w-full justify-between flex-1 overflow-y-auto">
        <div className="flex flex-col justify-start overflow-y-auto">
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className=" h-[646px] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle>유저 관리</DialogTitle>
              <DialogDescription>유저 정보를 수정합니다.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center space-x-2">
              <UserInfoDialog userId={userId!} userProfile={userProfile} />
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
          <Table className="container relative py-2 mx-auto overflow-y-auto">
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
        <DataTablePagination table={table} pagination={pagination} />
      </div>
    </Dialog>
  );
}
