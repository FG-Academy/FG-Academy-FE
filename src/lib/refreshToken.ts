export async function refreshToken() {
  try {
    console.log("sdf");
    const response = await fetch("http://localhost:3000/auth/refresh-token", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken); // 새로운 Access Token 저장
    return data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
