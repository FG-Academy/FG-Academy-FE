export default async function getAdminSubmittedQuizList(
  accessToken: string,
  userId: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes/${userId}`,
    {
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get dashboard Info");
  }
  return response.json();
}
