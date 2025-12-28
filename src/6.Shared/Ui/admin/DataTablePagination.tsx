import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { PaginationState, Table } from "@tanstack/react-table";
import { useEffect } from "react";
import { cn } from "@/6.shared/lib";

interface DataTablePaginationProps<TData> {
  pagination: PaginationState;
  table: Table<TData>;
  className?: string;
}

export function DataTablePagination<TData>({
  pagination,
  table,
  className,
}: DataTablePaginationProps<TData>) {
  useEffect(() => {
    table.setPageIndex(pagination.pageIndex);
  }, [pagination.pageIndex, table]);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white",
        className
      )}
    >
      <div className="text-sm text-gray-500">
        {table.getFilteredRowModel().rows.length > 0 && (
          <span>
            총 <span className="font-medium text-gray-900">{table.getFilteredRowModel().rows.length}</span>개 항목
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{currentPage}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span>{totalPages}</span>
          <span className="text-gray-500 ml-1">페이지</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanPreviousPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">첫 페이지</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanPreviousPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">이전 페이지</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanNextPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">다음 페이지</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              table.getCanNextPage()
                ? "hover:bg-gray-100 text-gray-700"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <span className="sr-only">마지막 페이지</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
