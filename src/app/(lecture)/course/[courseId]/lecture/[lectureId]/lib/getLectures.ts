export async function getLectures(courseId: number, accessToken: string) {
  const response = await fetch(
    `http://localhost:3000/courses/${courseId}/lectures`,
    {
      next: {
        tags: ["lectures"],
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
