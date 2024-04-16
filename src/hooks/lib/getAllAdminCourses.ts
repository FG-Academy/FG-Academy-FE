export async function getAllAdminCourses(accessToken: string) {
  const response = await fetch(`http://localhost:3000/admin/courses`, {
    next: {
      tags: ["allCourses"],
    },
    credentials: "include",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
