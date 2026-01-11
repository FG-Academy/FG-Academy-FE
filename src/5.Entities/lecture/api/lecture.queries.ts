import { queryOptions } from "@tanstack/react-query";
import { getLecturesByCourse } from "./get-lectures-by-course";
import { getLectureTimeRecord } from "./get-lecture-time-record";
import type { LectureTimeRecord } from "../model/lecture.type";

export const lectureQueries = {
  all: () => ["lecture"],

  byCourse: (courseId: number) =>
    queryOptions({
      queryKey: [...lectureQueries.all(), courseId],
      queryFn: () => getLecturesByCourse(courseId),
    }),

  /** 강의 시간 기록 조회 */
  timeRecord: (lectureId: number) =>
    queryOptions<LectureTimeRecord>({
      queryKey: ["lectureTimeRecord", lectureId],
      queryFn: () => getLectureTimeRecord(lectureId),
    }),
};
