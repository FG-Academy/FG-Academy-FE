"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SortingHeader } from "../../../components/SortingHeader";
import { departments, positions } from "@/app/types/type";
import useOpenMultipleDialogStore from "@/store/useOpenMultipleDialogStore";
import { IUser } from "@/model/user";

export const MultipleQuizColumn: ColumnDef<IUser>[] = [
  {
    accessorKey: "userId",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="이름" />
        <SortingHeader column={column} title="이름" />
      );
    },
    // cell: (info) => info.getValue(),
    cell: ({ row }) => {
      return <div className="text-center ">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "courseTitle",
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return <SortingHeader column={column} title="직분" />;
    },
    cell: ({ row }) => {
      const positionValue = row.getValue("position");
      const positionLabel =
        positions.find((pos) => pos.value === positionValue)?.label || "N/A";
      return <div className="text-center ">{positionLabel}</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return <SortingHeader column={column} title="레벨" />;
    },
    enableHiding: true,
  },

  {
    accessorKey: "department",
    header: ({ column }) => {
      return <SortingHeader column={column} title="부서" />;
    },
    cell: ({ row }) => {
      const departmentValue = row.getValue("department");
      const departmentLabel =
        departments.find((dept) => dept.value === departmentValue)?.label ||
        "N/A";
      return <div className="text-center ">{departmentLabel}</div>;
    },
    enableHiding: false,
  },
  {
    id: "button",
    cell: ({ row }) => {
      const { setOpen, setUserId } = useOpenMultipleDialogStore(
        (state) => state
      );

      return (
        <Button
          variant="secondary"
          className="px-4 space-x-2 border border-gray-300 hover:bg-gray-400"
          onClick={() => {
            setUserId(parseInt(row.getValue("userId")));
            setOpen(true);
          }}
        >
          상세 보기
        </Button>
      );
    },
    enableHiding: false,
  },
];
