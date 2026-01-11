import { apiClient } from "@/6.shared/api";
import type { UserEnrollmentResponse } from "../model/user.types";

export async function getUserEnrollments(
  userId: number
): Promise<UserEnrollmentResponse[]> {
  return apiClient.get<UserEnrollmentResponse[]>(
    `/admin/users/${userId}/enrollments`
  );
}
