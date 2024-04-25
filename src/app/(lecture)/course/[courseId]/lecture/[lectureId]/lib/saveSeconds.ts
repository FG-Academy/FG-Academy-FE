import { auth } from "@/auth";

// 데이터 저장 함수
export const saveSeconds = async (
  seconds: number,
  lectureId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/save-lecture-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ minutes: seconds, lectureId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to save duration");
    }
  } catch (error) {
    console.error("Error saving duration:", error);
  }
};
