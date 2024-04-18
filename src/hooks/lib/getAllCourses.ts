export async function getAllCourses() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    next: {
      tags: ["allCourses"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
