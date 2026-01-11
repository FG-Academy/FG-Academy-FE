import { apiClient } from "@/6.shared/api";
import type { UserLecture } from "../model/user.types";

export async function getUserLecturesDetail(
  userId: number,
  courseId: number
): Promise<UserLecture[]> {
  return apiClient.get<UserLecture[]>(
    `/admin/users/${userId}/enrollments/${courseId}`
  );
}
