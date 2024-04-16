export async function getAllCourses() {
  const response = await fetch(`http://localhost:3000/courses`, {
    next: {
      tags: ["allCourses"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
