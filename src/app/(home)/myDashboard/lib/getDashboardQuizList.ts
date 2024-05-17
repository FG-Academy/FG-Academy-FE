export default async function getDashboardQuizList(accessToken: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/quizzes`,
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
