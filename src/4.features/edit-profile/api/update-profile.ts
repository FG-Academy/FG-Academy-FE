import { apiClient } from "@/6.shared/api/apiClient";
import type { ProfileUpdateFormValues } from "../model/profile.schema";

export async function updateProfile(
  data: Partial<ProfileUpdateFormValues>
): Promise<unknown> {
  return apiClient.post("/users/profile", data);
}
