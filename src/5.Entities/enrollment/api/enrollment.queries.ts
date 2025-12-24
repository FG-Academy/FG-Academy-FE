import { queryOptions } from "@tanstack/react-query";
import { getEnrollmentByCourse } from "./get-enrollment-by-course";
import { getMyCourseLectures } from "./get-my-course-lectures";
import { getLectureProgress } from "./get-lecture-progress";
import type {
  MyCourseDetail,
  LectureProgressResult,
} from "../model/enrollment.type";

export const enrollmentQueries = {
  all: () => ["enrollment"],

  byCourse: (courseId: number) =>
    queryOptions({
      queryKey: [...enrollmentQueries.all(), courseId],
      queryFn: () => getEnrollmentByCourse(courseId),
    }),

  /** 수강 중인 코스의 강의, 퀴즈, 제출현황 조회 (강의 수강 화면용) */
  myCourseLectures: (courseId: number, accessToken: string) =>
    queryOptions<MyCourseDetail>({
      queryKey: ["myCourse", courseId, accessToken],
      queryFn: () => getMyCourseLectures(courseId, accessToken),
      enabled: !!accessToken,
    }),

  /** 강의 진도 현황 조회 */
  lectureProgress: (courseId: number, accessToken: string) =>
    queryOptions<LectureProgressResult>({
      queryKey: ["progress", courseId, accessToken],
      queryFn: () => getLectureProgress(courseId, accessToken),
      enabled: !!accessToken,
    }),
};
