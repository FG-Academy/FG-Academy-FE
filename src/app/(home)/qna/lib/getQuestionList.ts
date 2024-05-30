export async function getQuestionList(accessToken: string, page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/qna?page=${page}`,
    {
      next: {
        tags: ["qna"],
      },
      credentials: "include",
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get a course");
  }

  return response.json();
}
