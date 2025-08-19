import { queryOptions } from "@tanstack/react-query";
import { getEnrollmentByCourse } from "./get-enrollment-by-course";

export const enrollmentQueries = {
  all: () => ["enrollment"],
  byCourse: (courseId: number) =>
    queryOptions({
      queryKey: [...enrollmentQueries.all(), courseId],
      queryFn: () => getEnrollmentByCourse(courseId),
    }),
};
