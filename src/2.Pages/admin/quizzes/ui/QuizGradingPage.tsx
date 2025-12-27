"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { adminQuizQueries, type AdminQuizFilter } from "@/5.entities/admin/quiz";
import { adminCourseQueries } from "@/5.entities/admin/course";
import {
  QuizSubmissionsDataTable,
  quizSubmissionsColumns,
} from "@/3.widgets/admin/quiz-grading";
import { Filter } from "@/6.shared/ui/admin";
import { departments, positions } from "@/app/types/type";

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

  const { data: quizSubmits, isLoading } = useQuery(
    adminQuizQueries.submissions(
      pagination,
      filters,
      sortBy,
      myDepartment,
      userLevel
    )
  );

  // Debounced name search
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameInputValue }));
    }, 500);
    return () => clearTimeout(handler);
  }, [nameInputValue]);

  // Reset pagination when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters]);

  if (isLoading || !quizSubmits || !courses) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 space-y-2">
      {/* Filters */}
      <div className="flex space-x-2 mb-2 items-center flex-wrap gap-2">
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
            setFilters((prev) => ({ ...prev, departmentName: value }))
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
          onChange={(value) => setSortBy(value)}
        />
      </div>

      {/* Data Table */}
      <div className="flex flex-col p-2 h-[650px]">
        <QuizSubmissionsDataTable
          totalPages={quizSubmits.result.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          columns={quizSubmissionsColumns}
          data={quizSubmits.result.content}
        />
      </div>
    </div>
  );
}
