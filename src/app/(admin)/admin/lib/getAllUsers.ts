import { UserFilter } from "../hooks/useUserQuery";

export async function getAllUsers(
  accessToken: string,
  pagination: { pageIndex: number; pageSize: number },
  filters: UserFilter,
  sortBy: string
) {
  const filterParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filterParams.append(key, value); // 필터 값이 있는 경우만 쿼리 추가
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users?page=${
      pagination.pageIndex + 1
    }&size=10&${filterParams.toString()}&sortBy=${sortBy}`,
    {
      next: {
        tags: ["user page"],
      },
      credentials: "include",
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
