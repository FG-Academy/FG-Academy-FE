import { queryOptions } from "@tanstack/react-query";
import { getUserProfile } from "./get-user-profile";

export const userQueries = {
  all: () => ["user"],
  profile: () =>
    queryOptions({
      queryKey: [...userQueries.all(), "profile"],
      queryFn: () => getUserProfile(),
      gcTime: 0,
    }),
};
