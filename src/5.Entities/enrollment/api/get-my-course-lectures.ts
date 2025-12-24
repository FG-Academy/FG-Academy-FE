/** 수강 중인 코스의 강의, 퀴즈, 제출현황 조회 */
export async function getMyCourseLectures(
  courseId: number,
  accessToken: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/myLectures/${courseId}`,
    {
      next: {
        tags: ["courses"],
      },
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get my course lectures");
  }

  return response.json();
}
