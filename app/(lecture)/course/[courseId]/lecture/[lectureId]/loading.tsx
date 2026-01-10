import { Skeleton } from "@/6.shared/ui";

export default function Loading() {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden bg-zinc-950">
      <div className="flex flex-1 flex-col w-full h-full relative">
        <div className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-24 bg-zinc-900 rounded-md" />
            <Skeleton className="h-5 w-64 bg-zinc-900" />
          </div>
          <Skeleton className="h-8 w-24 bg-zinc-900 rounded-full" />
        </div>

        <div className="flex-1 w-full flex items-center justify-center p-8 bg-black">
          <div className="flex flex-col items-center gap-6 opacity-20">
            <Skeleton className="h-20 w-20 rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-48 bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[400px] h-full border-l border-zinc-200 bg-white shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-6 space-y-6 border-b border-zinc-100">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-zinc-100">
                <div className="px-6 py-4 flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
