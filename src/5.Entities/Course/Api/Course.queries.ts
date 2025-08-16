import { queryOptions } from "@tanstack/react-query";
import { getCourses } from "./getCourses";

export const courseQueries = {
  all: () => ["course"],
  lists: () => [...courseQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...courseQueries.lists()],
      queryFn: () => getCourses(),
    }),
};
