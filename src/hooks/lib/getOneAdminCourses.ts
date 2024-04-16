export async function getOneAdminCourses(
  accessToken: string,
  courseId: number
) {
  const response = await fetch(
    `http://localhost:3000/admin/courses/${courseId}`,
    {
      next: {
        tags: ["oneAdminCourses"],
      },
      credentials: "include",
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
