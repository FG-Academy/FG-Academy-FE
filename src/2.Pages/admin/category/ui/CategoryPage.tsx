"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { categoryQueries } from "@/5.entities/admin/category";
import { CategoryEditForm } from "@/4.features/admin/manage-category";
import { PageHeader } from "@/6.shared/ui/admin";

export function CategoryPage() {
  const { data: categories, isLoading } = useQuery(categoryQueries.all());

  if (isLoading || !categories) {
    return (
      <div className="p-8 w-full flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <PageHeader
        title="카테고리 관리"
        description="강의 카테고리를 추가, 수정, 삭제하고 순서를 변경할 수 있습니다."
      />
      <div className="mt-6 flex justify-center">
        <CategoryEditForm categoriesInfo={categories} />
      </div>
    </div>
  );
}
