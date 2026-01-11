import { apiClient } from "@/6.shared/api";
import type { ICategory } from "../model/category.types";

export async function getCategories(): Promise<ICategory[]> {
  return apiClient.get<ICategory[]>("/admin/categories");
}
