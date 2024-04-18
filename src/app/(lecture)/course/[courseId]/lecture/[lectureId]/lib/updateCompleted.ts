import { auth } from "@/auth";

// 데이터 저장 함수
export const updateCompleted = async (
  lectureId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/completed`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ lectureId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update status 'completed'");
    }
    // 성공 로그 또는 처리
    console.log(response.json());
  } catch (error) {
    console.error("Error saving duration:", error);
  }
};
