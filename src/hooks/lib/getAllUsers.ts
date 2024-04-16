export async function getAllUsers(accessToken: string) {
  const response = await fetch(`http://localhost:3000/users`, {
    next: {
      tags: ["allUser"],
    },
    credentials: "include",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
