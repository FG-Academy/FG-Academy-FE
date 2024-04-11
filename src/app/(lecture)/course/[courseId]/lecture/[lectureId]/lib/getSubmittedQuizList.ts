export default async function getSubmittedQuizList(accessToken: string) {
  const response = await fetch(`http://localhost:3000/dashboard/quizzes`, {
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to get dashboard Info");
  }
  return response.json();
}
