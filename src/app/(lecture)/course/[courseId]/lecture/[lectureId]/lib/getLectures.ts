export async function getLectures(courseId: number) {
  const response = await fetch(
    `http://localhost:3000/courses/${courseId}/lectures`,
    {
      next: {
        tags: ["lectures"],
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get lectures");
  }

  return response.json();
}
