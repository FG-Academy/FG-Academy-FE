import { apiClient } from "@/6.shared/api/apiClient";
import type { User } from "../model/user.type";

export async function getUserProfile(): Promise<User> {
  return apiClient.get<User>("/users/profile");
}
