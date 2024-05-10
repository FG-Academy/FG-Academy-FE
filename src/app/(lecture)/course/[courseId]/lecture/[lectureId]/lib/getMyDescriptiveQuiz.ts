export async function getMyDescriptiveQuiz(
  accessToken: string,
  userId: number,
  quizId: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes/descriptive/${userId}/${quizId}`,
    {
      next: {
        tags: ["quizzes"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get courses");
  }

  return response.json();
}
