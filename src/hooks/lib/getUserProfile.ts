export async function getUserProfile(accessToken: string) {
  const response = await fetch(`http://localhost:3000/users/profile`, {
    next: {
      tags: ["userProfile"],
    },
    credentials: "include",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get user profile");
  }

  return response.json();
}
