"use client";

import { useSession } from "next-auth/react";
import { DescriptiveQuizColumn } from "../descriptive/components/DescriptiveQuizColumn";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useQuizSubmitQuery } from "./hooks/useQuizSubmitQuery";
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import Filter from "../../users/components/UserFilter";
import { DescriptiveDataTableQuiz2 } from "./components/DescriptiveDataTable2";
import { departments, positions } from "@/app/types/type";
import { useFetchAllAdminCourseListQuery } from "../../hooks/useAdminCourseQuery";

export default function AdminQuizPage() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;
  const myDepartment = session?.user?.department;
  const userLevel = session?.user?.level;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    name: "",
    position: "",
    departmentName: "",
    courseTitle: "",
    quizType: "",
    answerStatus: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [nameInputValue, setNameInputValue] = useState("");

  const { data: courses } = useFetchAllAdminCourseListQuery(accessToken);
  const {
    data: quizSubmits,
    isFetching,
    error,
    status,
  } = useQuizSubmitQuery(
    accessToken,
    pagination,
    filters,
    sortBy,
    myDepartment!,
    userLevel!
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameInputValue }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameInputValue]);

  if (!quizSubmits || !courses) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex-1 flex flex-col p-4 space-y-2">
      <div className="flex space-x-2 mb-2 items-center">
        <input
          type="text"
          placeholder="이름 검색"
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
        />
        <Filter
          label="직분"
          value={filters.position}
          options={positions}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, position: value }))
          }
        />
        <Filter
          label="부서"
          value={filters.departmentName}
          options={departments}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, department: value }))
          }
        />
        <Filter
          label="코스 이름"
          value={filters.courseTitle}
          options={courses.map((course) => ({
            value: course.title,
            label: course.title,
          }))}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, courseTitle: value }))
          }
        />
        <Filter
          label="퀴즈 유형"
          value={filters.quizType}
          options={[
            { value: "객관식", label: "객관식" },
            { value: "주관식", label: "주관식" },
          ]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, quizType: value }))
          }
        />
        <Filter
          label="정답 현황"
          value={filters.answerStatus}
          options={[
            { value: "정답", label: "정답" },
            { value: "미채점", label: "미채점" },
            { value: "오답", label: "오답" },
          ]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, answerStatus: value }))
          }
        />
        <Filter
          label="정렬 기준"
          value={sortBy}
          options={[
            { value: "newest", label: "최신순" },
            { value: "oldest", label: "오래된순" },
          ]}
          onChange={(value) => setSortBy(value)} // 선택한 정렬 옵션을 sortBy로 설정
        />
      </div>
      <div className="flex flex-col p-2 h-[650px]">
        <DescriptiveDataTableQuiz2
          totalPages={quizSubmits.result.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          columns={DescriptiveQuizColumn}
          data={quizSubmits.result.content}
        />
      </div>
    </div>
  );
}
