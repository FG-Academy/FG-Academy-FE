export default async function getLectureQuizList(
  accessToken: string,
  courseId: number,
  lectureId: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${courseId}/${lectureId}`,
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
