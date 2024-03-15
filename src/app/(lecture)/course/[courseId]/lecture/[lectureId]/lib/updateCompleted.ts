// 데이터 저장 함수
export const updateCompleted = async (userId: number, lectureId: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/completed`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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
