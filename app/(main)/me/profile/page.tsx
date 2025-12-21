import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { userQueries } from "@/5.entities/user";
import { MyProfilePageContent } from "@/2.pages/my-profile";
import { Spinner } from "@/6.shared/ui";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(userQueries.profile());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner />
          </div>
        }
      >
        <MyProfilePageContent />
      </Suspense>
    </HydrationBoundary>
  );
}
