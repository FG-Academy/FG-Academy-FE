import { apiClient } from "@/6.shared/api";
import type { UserFilter, UserListResponse } from "../model/user.types";

export async function getUsers(
  pagination: { pageIndex: number; pageSize: number },
  filters: UserFilter,
  sortBy: string
): Promise<UserListResponse> {
  const params: Record<string, string | number> = {
    page: pagination.pageIndex + 1,
    size: pagination.pageSize,
    sortBy,
  };

  // Add filters only if they have values
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params[key] = value;
    }
  });

  return apiClient.get<UserListResponse>("/admin/users", { params });
}
