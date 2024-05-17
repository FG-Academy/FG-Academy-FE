export async function getMyCoursesQuiz(accessToken: string, userId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/lectures/${userId}`,
    {
      next: {
        tags: ["courses"],
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
