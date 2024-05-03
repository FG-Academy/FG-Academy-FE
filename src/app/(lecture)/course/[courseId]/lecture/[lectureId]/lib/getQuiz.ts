export async function getQuiz(
  courseId: number,
  lectureId: number,
  accessToken: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${courseId}/${lectureId}`,
    {
      next: {
        tags: ["quizzes"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get lectures");
  }

  return response.json();
}
