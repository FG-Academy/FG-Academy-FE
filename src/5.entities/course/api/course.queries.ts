import { queryOptions } from "@tanstack/react-query";
import { getCourses } from "./get-courses";
import { getCourseDetail } from "./get-course-detail";
import { getMyCourses } from "./get-my-courses";

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
  myCourses: () =>
    queryOptions({
      queryKey: [...courseQueries.all(), "myCourse"],
      queryFn: () => getMyCourses(),
    }),
};
