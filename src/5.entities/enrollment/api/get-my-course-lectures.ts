import { apiClient } from "@/6.shared/api";
import type { MyCourseDetail } from "../model/enrollment.type";

/** 수강 중인 코스의 강의, 퀴즈, 제출현황 조회 */
export async function getMyCourseLectures(
  courseId: number
): Promise<MyCourseDetail> {
  return apiClient.get<MyCourseDetail>(`/courses/myLectures/${courseId}`);
}
