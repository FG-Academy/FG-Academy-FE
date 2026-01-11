import { apiClient } from "@/6.shared/api";

export async function deleteUser(userId: number): Promise<void> {
  await apiClient.delete<void>(`/admin/users/${userId}`);
}
