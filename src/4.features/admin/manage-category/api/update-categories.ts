import { apiClient } from "@/6.shared/api";
import type { ICategory } from "@/5.entities/admin/category";

interface UpdateCategoriesRequest {
  categories: ICategory[];
}

export async function updateCategories(
  categories: ICategory[]
): Promise<void> {
  await apiClient.put<void, UpdateCategoriesRequest>("/admin/categories", {
    categories,
  });
}
