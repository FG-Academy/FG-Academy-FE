export async function getLectuereTimeRecord(
  accessToken: string,
  lectureId: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/lectures/${lectureId}`,
    {
      next: {
        tags: ["progress"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get lectures");
  }

  return response.json();
}
