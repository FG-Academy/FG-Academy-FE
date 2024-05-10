export async function getMyCourses(courseId: number, accessToken: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/myLectures/${courseId}`,
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
