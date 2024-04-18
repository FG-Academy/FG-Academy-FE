export async function getUser(page: number, accessToken: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`,
    {
      next: {
        tags: ["users"],
      },
      credentials: "include",
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get users");
  }

  return response.json();
}
