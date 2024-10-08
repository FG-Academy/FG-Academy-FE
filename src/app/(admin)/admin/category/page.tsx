"use client";

import { useSession } from "next-auth/react";
import CategoryEdit from "./components/CategoryEdit";
import { useFetchAllCategoriesQuery } from "./hooks/useCategoryQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";

interface Category {
  categoryId: number;
  name: string;
  order: number;
}

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: categories } = useFetchAllCategoriesQuery(accessToken);

  if (!categories) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <CategoryEdit categoriesInfo={categories} />
    </div>
  );
}
