export async function getOneUser(accessToken: string, userId: number) {
  const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
    next: {
      tags: ["course", "userId"],
    },
    credentials: "include",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get a course");
  }

  return response.json();
}
