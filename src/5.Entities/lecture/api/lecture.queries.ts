import { queryOptions } from "@tanstack/react-query";
import { getLecturesByCourse } from "./get-lectures-by-course";

export const lectureQueries = {
  all: () => ["lecture"],
  byCourse: (courseId: number) =>
    queryOptions({
      queryKey: [...lectureQueries.all(), courseId],
      queryFn: () => getLecturesByCourse(courseId),
    }),
};
