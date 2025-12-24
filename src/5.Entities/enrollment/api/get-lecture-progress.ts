/** 강의 진도 현황 조회 */
export async function getLectureProgress(
  courseId: number,
  accessToken: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/lectures/progress`,
    {
      next: {
        tags: ["progress"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get lecture progress");
  }

  return response.json();
}
