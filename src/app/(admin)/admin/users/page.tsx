"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { columns } from "./components/columns";
import { useSession } from "next-auth/react";
import { useFetchAllUserListQuery } from "../hooks/useUserQuery";
import { DataTable2 } from "./components/DataTable2";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./components/UserFilter";
import { departments, positions, userLevelOptions } from "@/app/types/type";

const sortOptions = [
  { label: "이름순", value: "name" },
  { label: "최근등록순", value: "createdAt" },
  { label: "근속년수순", value: "yearsOfService" },
];

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    name: "",
    level: "",
    position: "",
    department: "",
    church: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [nameInputValue, setNameInputValue] = useState("");

  const { data: allUsers, refetch: refetchFilteredUsers } =
    useFetchAllUserListQuery(accessToken, pagination, filters, sortBy);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameInputValue }));
    }, 500); // 500ms 지연 시간

    // 클린업 함수로 입력 변화 시 타이머 초기화
    return () => {
      clearTimeout(handler);
    };
  }, [nameInputValue]);

  if (!allUsers) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 px-10">
      {/* <div className="text-2xl mb-4">유저 관리</div> */}
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
          options={[
            { value: "fg", label: "꽃동산교회" },
            { value: "others", label: "타교회" },
          ]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, church: value }))
          }
        />
        <Filter
          label="정렬 기준"
          value={sortBy}
          options={sortOptions} // 정렬 옵션 전달
          onChange={(value) => setSortBy(value)} // 선택한 정렬 옵션을 sortBy로 설정
        />
        {/* <Button
          onClick={() => {
            refetchFilteredUsers();
          }}
          className=""
        >
          검색
        </Button> */}
      </div>
      <div className="flex flex-col p-2 h-[646px]">
        {/* <DataTable columns={columns} data={allUsers.result.content} /> */}
        <DataTable2
          totalPages={allUsers.result.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          columns={columns}
          data={allUsers.result.content}
        />
      </div>
    </div>
  );
}
