export async function getCourses(courseId: number) {
  const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
    next: {
      tags: ["courses"],
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get courses");
  }

  return response.json();
}
