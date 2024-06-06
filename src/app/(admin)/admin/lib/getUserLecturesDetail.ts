export async function getUserLecturesDetail(
  accessToken: string,
  userId: number,
  courseId: number | null
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/enrollments/${courseId}`,
    {
      next: {
        tags: ["course", "userId", "enrollments"],
      },
      credentials: "include",
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get a course");
  }

  return response.json();
}
