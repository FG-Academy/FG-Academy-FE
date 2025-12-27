"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/5.entities/admin/category";
import { CategoryEditForm } from "@/4.features/admin/manage-category";
import { Loading } from "@/6.shared/ui";

export function CategoryPage() {
  const { data: categories, isLoading } = useQuery(categoryQueries.all());

  if (isLoading || !categories) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <CategoryEditForm categoriesInfo={categories} />
    </div>
  );
}
