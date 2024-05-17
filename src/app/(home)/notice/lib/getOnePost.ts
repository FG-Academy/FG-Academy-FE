export async function getOnePost(accessToken: string, announcementId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${announcementId}`,
    {
      next: {
        tags: ["posts"],
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
