import { queryOptions } from "@tanstack/react-query";
import { getCategories } from "./get-categories";

export const categoryQueries = {
  all: () =>
    queryOptions({
      queryKey: ["admin", "categories"],
      queryFn: getCategories,
    }),
};
