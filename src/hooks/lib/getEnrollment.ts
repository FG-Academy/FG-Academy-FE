export async function getEnrollment(accessToken: string, courseId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/enrollment`,
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
