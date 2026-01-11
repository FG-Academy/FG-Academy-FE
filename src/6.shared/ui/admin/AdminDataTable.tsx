import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/6.shared/ui/shadcn/ui/table";
import { Skeleton } from "@/6.shared/ui/shadcn/ui/skeleton";
import { DataTablePagination } from "./DataTablePagination";

interface AdminDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalPages: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  isFetching?: boolean;
  columnVisibility?: Record<string, boolean>;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
}

function SkeletonRows({
  pageSize,
  columnsCount,
}: {
  pageSize: number;
  columnsCount: number;
}) {
  return Array.from({ length: pageSize }).map((_, rowIndex) => (
    <TableRow key={`skeleton-row-${rowIndex}`}>
      {Array.from({ length: columnsCount }).map((_, colIndex) => (
        <TableCell
          key={`skeleton-cell-${rowIndex}-${colIndex}`}
          className="px-4 py-3"
        >
          <Skeleton className="h-5 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}

function DataRows<TData>({
  rows,
  onRowClick,
}: {
  rows: Row<TData>[];
  onRowClick?: (row: TData) => void;
}) {
  return rows.map((row) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      onClick={() => onRowClick?.(row.original)}
      className={
        onRowClick
          ? "cursor-pointer hover:bg-gray-50 transition-colors"
          : "hover:bg-gray-50 transition-colors"
      }
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="px-4 py-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}

function EmptyRow({
  columnsCount,
  message,
}: {
  columnsCount: number;
  message: string;
}) {
  return (
    <TableRow>
      <TableCell
        colSpan={columnsCount}
        className="h-32 text-center text-gray-500"
      >
        {message}
      </TableCell>
    </TableRow>
  );
}

export function AdminDataTable<TData>({
  columns,
  data,
  totalPages,
  pagination,
  onPaginationChange,
  isFetching = false,
  columnVisibility = {},
  onRowClick,
  emptyMessage = "검색 결과가 없습니다.",
}: AdminDataTableProps<TData>) {
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
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(newPagination);
    },
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50 hover:bg-gray-50"
              >
                {headerGroup.headers.map((header) => (
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
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <SkeletonRows
                pageSize={pagination.pageSize}
                columnsCount={columns.length}
              />
            ) : table.getRowModel().rows?.length ? (
              <DataRows
                rows={table.getRowModel().rows}
                onRowClick={onRowClick}
              />
            ) : (
              <EmptyRow columnsCount={columns.length} message={emptyMessage} />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        table={table}
        pagination={pagination}
        isFetching={isFetching}
      />
    </div>
  );
}
