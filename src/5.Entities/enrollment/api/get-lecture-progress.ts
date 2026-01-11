import { apiClient } from "@/6.shared/api";
import type { LectureProgressResult } from "../model/enrollment.type";

/** 강의 진도 현황 조회 */
export async function getLectureProgress(
  courseId: number
): Promise<LectureProgressResult> {
  return apiClient.get<LectureProgressResult>(
    `/courses/${courseId}/lectures/progress`
  );
}
