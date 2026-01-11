export interface ICategory {
  categoryId?: number;
  name: string;
  order: number;
}

export interface CategoryListResponse {
  categories: ICategory[];
}
