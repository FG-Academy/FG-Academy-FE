import { apiClient } from "@/6.shared/api";
import type { LectureTimeRecord } from "../model/lecture.type";

/** 강의 시간 기록 조회 */
export async function getLectureTimeRecord(
  lectureId: number
): Promise<LectureTimeRecord> {
  return apiClient.get<LectureTimeRecord>(`/courses/lectures/${lectureId}`);
}
