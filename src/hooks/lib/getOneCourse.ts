export async function getOneCourse(accessToken: string, courseId: number) {
  const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
    next: {
      tags: ["course"],
    },
    credentials: "include",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get a course");
  }

  return response.json();
}
