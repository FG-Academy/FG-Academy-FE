export async function getProgress(courseId: number) {
  const response = await fetch(
    `http://localhost:3000/courses/${courseId}/lectures/progress?userId=1`,
    {
      next: {
        tags: ["progress"],
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get lectures");
  }

  return response.json();
}
