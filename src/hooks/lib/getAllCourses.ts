export async function getAllCourses() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    next: {
      tags: ["allCourses"],
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get allUser");
  }

  return response.json();
}
