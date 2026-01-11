import { apiClient } from "@/6.shared/api";

/** 강의 완료 처리 API */
export async function updateLectureCompleted(
  lectureId: number,
  courseId: number
): Promise<void> {
  return apiClient.patch<void, Record<string, never>>(
    `/users/completed/${lectureId}/${courseId}`,
    {}
  );
}
