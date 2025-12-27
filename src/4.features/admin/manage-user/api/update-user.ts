import { apiClient } from "@/6.shared/api";

interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  churchName?: string;
  departmentName?: string;
  position?: string;
  yearsOfService?: number;
  level?: string;
  birthDate?: string;
}

export async function updateUser(
  userId: number,
  data: UpdateUserData
): Promise<void> {
  await apiClient.patch<void, UpdateUserData>(`/admin/users/${userId}`, data);
}
