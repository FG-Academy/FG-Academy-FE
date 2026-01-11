import { apiClient } from "@/6.shared/api";
import type { UserProfileResponse } from "../model/user.types";

export async function getUserById(userId: number): Promise<UserProfileResponse> {
  return apiClient.get<UserProfileResponse>(`/admin/users/${userId}`);
}
