"use client";

import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { userQueries, type UserFilter } from "@/5.entities/admin/user";
import { UserDataTable, userColumns } from "@/3.widgets/admin/user-table";
import { Filter, PageHeader, SearchInput } from "@/6.shared/ui/admin";
import { departments, positions, userLevelOptions } from "@/5.entities/user";

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
      <div className="p-8 w-full flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <PageHeader
        title="사용자 관리"
        description="사용자 정보를 조회하고 관리할 수 있습니다."
      />

      {/* Filters */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
            placeholder="이름 검색..."
            className="w-48"
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
          <div className="ml-auto">
            <Filter
              label="정렬"
              value={sortBy}
              options={sortOptions}
              onChange={(value) => setSortBy(value)}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4">
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
