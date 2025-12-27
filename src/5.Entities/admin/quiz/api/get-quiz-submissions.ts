import { apiClient } from "@/6.shared/api";
import type {
  AdminQuizFilter,
  AdminQuizSubmissionListResponse,
} from "../model/quiz.types";

/** Fetch paginated quiz submissions with filters */
export async function getAdminQuizSubmissions(
  pagination: { pageIndex: number; pageSize: number },
  filters: AdminQuizFilter,
  sortBy: string,
  userDepartment: string,
  userLevel: string
): Promise<AdminQuizSubmissionListResponse> {
  const params: Record<string, string | number> = {
    page: pagination.pageIndex + 1,
    size: pagination.pageSize || 10,
    orderBy: sortBy,
    userDepartment,
    userLevel,
  };

  // Add filter params if they have values
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params[key] = value;
    }
  });

  return apiClient.get<AdminQuizSubmissionListResponse>("/admin/quizzes", {
    params,
  });
}
