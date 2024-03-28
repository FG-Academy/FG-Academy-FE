export async function getQuiz(
  courseId: number,
  lectureId: number,
  accessToken: string
) {
  // const response = await fetch(`http://localhost:3000/quizzes/${courseId}`, {
  const response = await fetch(
    `http://localhost:3000/quizzes/${courseId}/${lectureId}`,
    {
      next: {
        tags: ["quizzes"],
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

// http://localhost:3000/quizzes/:courseId/:lectureId
