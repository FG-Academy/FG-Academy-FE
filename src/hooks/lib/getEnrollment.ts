export async function getEnrollment(accessToken: string, courseId: number) {
  const response = await fetch(
    `http://localhost:3000/courses/${courseId}/enrollment`,
    {
      next: {
        tags: ["enrollment"],
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
