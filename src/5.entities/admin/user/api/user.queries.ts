import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "./get-users";
import { getUserById } from "./get-user-by-id";
import { getUserEnrollments } from "./get-user-enrollments";
import { getUserLecturesDetail } from "./get-user-lectures-detail";
import type { UserFilter } from "../model/user.types";

export const userQueries = {
  all: (
    pagination: { pageIndex: number; pageSize: number },
    filters: UserFilter,
    sortBy: string
  ) =>
    queryOptions({
      queryKey: ["admin", "users", pagination, filters, sortBy],
      queryFn: () => getUsers(pagination, filters, sortBy),
      placeholderData: keepPreviousData,
    }),

  byId: (userId: number) =>
    queryOptions({
      queryKey: ["admin", "users", userId],
      queryFn: () => getUserById(userId),
      enabled: !!userId,
    }),

  enrollments: (userId: number) =>
    queryOptions({
      queryKey: ["admin", "users", userId, "enrollments"],
      queryFn: () => getUserEnrollments(userId),
      enabled: !!userId,
    }),

  lecturesDetail: (userId: number, courseId: number | null) =>
    queryOptions({
      queryKey: ["admin", "users", userId, "enrollments", courseId],
      queryFn: () => getUserLecturesDetail(userId, courseId!),
      enabled: !!userId && !!courseId,
    }),
};
