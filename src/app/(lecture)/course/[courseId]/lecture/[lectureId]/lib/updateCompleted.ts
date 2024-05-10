import { auth } from "@/auth";

// 데이터 저장 함수
export const updateCompleted = async (
  lectureId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/completed/${lectureId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update status 'completed'");
    }
    // 성공 로그 또는 처리
  } catch (error) {
    console.error("Error saving duration:", error);
  }
};
