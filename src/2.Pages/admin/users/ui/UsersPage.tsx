"use client";

import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { userQueries, type UserFilter } from "@/5.entities/admin/user";
import { UserDataTable, userColumns } from "@/3.widgets/admin/user-table";
import { Filter } from "@/6.shared/ui/admin";
import { departments, positions, userLevelOptions } from "@/app/types/type";

const sortOptions = [
  { label: "이름순", value: "name" },
  { label: "최근등록순", value: "createdAt" },
  { label: "근속년수순", value: "yearsOfService" },
];

const churchOptions = [
  { value: "fg", label: "꽃동산교회" },
  { value: "others", label: "타교회" },
];

export function UsersPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<UserFilter>({
    name: "",
    level: "",
    position: "",
    department: "",
    church: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [nameInputValue, setNameInputValue] = useState("");

  const { data: allUsers, isLoading } = useQuery(
    userQueries.all(pagination, filters, sortBy)
  );

  // Debounce name input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameInputValue }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameInputValue]);

  if (isLoading || !allUsers) {
    return (
      <div className="w-full p-4 px-10 flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full p-4 px-10">
      <div className="flex space-x-2 mb-2 items-center">
        <input
          type="text"
          placeholder="이름 검색"
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
        />
        <Filter
          label="레벨"
          value={filters.level}
          options={userLevelOptions}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, level: value }))
          }
        />
        <Filter
          label="직위"
          value={filters.position}
          options={positions}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, position: value }))
          }
        />
        <Filter
          label="부서"
          value={filters.department}
          options={departments}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, department: value }))
          }
        />
        <Filter
          label="교회"
          value={filters.church}
          options={churchOptions}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, church: value }))
          }
        />
        <Filter
          label="정렬 기준"
          value={sortBy}
          options={sortOptions}
          onChange={(value) => setSortBy(value)}
        />
      </div>
      <div className="flex flex-col p-2 h-[646px]">
        <UserDataTable
          totalPages={allUsers.result.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          columns={userColumns}
          data={allUsers.result.content}
        />
      </div>
    </div>
  );
}
