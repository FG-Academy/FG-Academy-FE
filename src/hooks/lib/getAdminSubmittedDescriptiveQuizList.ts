export default async function getAdminSubmittedDescriptiveQuizList(
  accessToken: string,
  userId: number,
  queryQuizType: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/quizzes/${userId}?type=${queryQuizType}`,
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
