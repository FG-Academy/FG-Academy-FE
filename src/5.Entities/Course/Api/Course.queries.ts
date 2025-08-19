import { queryOptions } from "@tanstack/react-query";
import { getCourses } from "./get-courses";
import { getCourseDetail } from "./get-course-detail";

export const courseQueries = {
  all: () => ["course"],
  lists: () => [...courseQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...courseQueries.lists()],
      queryFn: () => getCourses(),
    }),
  detail: (courseId: number) =>
    queryOptions({
      queryKey: [...courseQueries.all(), courseId, "detail"],
      queryFn: () => getCourseDetail(courseId),
    }),
};
