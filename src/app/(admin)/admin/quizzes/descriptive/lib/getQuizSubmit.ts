export async function getQuizSubmit(accessToken: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes`,
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
