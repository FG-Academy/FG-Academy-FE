export async function getQuiz(courseId: number) {
  const response = await fetch(`http://localhost:3000/quizzes/${courseId}`, {
    next: {
      tags: ["quizzes"],
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get lectures");
  }

  return response.json();
}
