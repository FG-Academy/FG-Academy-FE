// 데이터 저장 함수
export const saveSeconds = async (
  seconds: number,
  userId: number,
  lectureId: number
) => {
  try {
    const response = await fetch(
      "http://localhost:3000/users/save-lecture-record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ minutes: seconds, userId, lectureId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to save duration");
    }
    // 성공 로그 또는 처리
    console.log(response.json());
  } catch (error) {
    console.error("Error saving duration:", error);
  }
};
