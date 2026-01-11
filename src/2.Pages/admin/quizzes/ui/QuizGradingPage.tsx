"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import {
  adminQuizQueries,
  type AdminQuizFilter,
} from "@/5.entities/admin/quiz";
import { adminCourseQueries } from "@/5.entities/admin/course";
import { QuizSubmissionsDataTable } from "@/3.widgets/admin/quiz-grading";
import { Filter, PageHeader, SearchInput } from "@/6.shared/ui/admin";
import { departments, positions } from "@/5.entities/user";

export function QuizGradingPage() {
  const { data: session } = useSession();
  const myDepartment = session?.user?.department ?? "";
  const userLevel = session?.user?.level ?? "";

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<AdminQuizFilter>({
    name: "",
    position: "",
    departmentName: "",
    courseTitle: "",
    quizType: "",
    answerStatus: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [nameInputValue, setNameInputValue] = useState("");

  const { data: courses } = useQuery(adminCourseQueries.all());

  const {
    data: quizSubmits,
    isLoading,
    isFetching,
  } = useQuery(
    adminQuizQueries.submissions(
      pagination,
      filters,
      sortBy,
      myDepartment,
      userLevel
    )
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameInputValue }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameInputValue]);

  if (isLoading || !quizSubmits || !courses) {
    return (
      <div className="p-8 w-full flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <PageHeader
        title="퀴즈 채점"
        description="제출된 퀴즈 답안을 채점할 수 있습니다."
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
              setFilters((prev) => ({ ...prev, departmentName: value }))
            }
          />
          <Filter
            label="코스"
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
          <div className="ml-auto">
            <Filter
              label="정렬"
              value={sortBy}
              options={[
                { value: "newest", label: "최신순" },
                { value: "oldest", label: "오래된순" },
              ]}
              onChange={(value) => setSortBy(value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <QuizSubmissionsDataTable
          data={quizSubmits.result.content}
          totalPages={quizSubmits.result.totalPages}
          pagination={pagination}
          onPaginationChange={setPagination}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}
