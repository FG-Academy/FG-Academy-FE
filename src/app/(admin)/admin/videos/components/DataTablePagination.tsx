import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseDeleteMutation } from "../../videos/hook/useCourseDeleteMutation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { mutate } = useCourseDeleteMutation(accessToken);

  const deleteSelectedRows = async () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.getValue("courseId") as number);
    if (
      confirm("정말로 삭제하시겠습니까? (등록된 강의, 퀴즈 모두 삭제됩니다.)")
    ) {
      try {
        mutate(selectedRowIds);
        table.setRowSelection({}); // Reset selection after deletion
      } catch (error) {
        toast({
          variant: "destructive",
          title: "요청이 불안정합니다..",
          description: "잠시 후 다시 시도해주세요.",
        });
        console.error("Failed to delete courses:", error);
      }
    } else {
      // User clicked 'Cancel'
      console.log("Deletion cancelled.");
    }
  };

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <Button
          disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
          className=" p-2 bg-red-500 text-white"
          onClick={deleteSelectedRows}
        >
          코스 삭제
        </Button>
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} 행이 선택되었습니다. */}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">페이지 당 행 갯수</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}{" "}
          페이지
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
