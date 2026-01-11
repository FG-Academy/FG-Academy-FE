import { queryOptions } from "@tanstack/react-query";
import { getAdminCourses } from "./get-admin-courses";
import { getAdminCourseById } from "./get-admin-course-by-id";

export const adminCourseQueries = {
  all: () =>
    queryOptions({
      queryKey: ["admin", "courses"],
      queryFn: () => getAdminCourses(),
    }),

  byId: (courseId: number) =>
    queryOptions({
      queryKey: ["admin", "courses", courseId],
      queryFn: () => getAdminCourseById(courseId),
      enabled: !!courseId,
    }),
};
