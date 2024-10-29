import { QuizFilter } from "../hooks/useQuizSubmitQuery";

export async function getQuizSubmit(
  accessToken: string,
  pagination: { pageIndex: number; pageSize: number },
  filters: QuizFilter,
  sortBy: string,
  userDepartment: string,
  userLevel: string
) {
  const filterParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filterParams.append(key, value); // 필터 값이 있는 경우만 쿼리 추가
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes?page=${
      pagination.pageIndex + 1
    }&size=10&${filterParams.toString()}&orderBy=${sortBy}&userDepartment=${userDepartment}&userLevel=${userLevel}`,
    {
      next: {
        tags: ["quizSubmits"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get quizSubmits");
  }

  return response.json();
}
