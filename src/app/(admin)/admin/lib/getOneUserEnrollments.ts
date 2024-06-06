export async function getOneUserEnrollments(
  accessToken: string,
  userId: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/enrollments`,
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
