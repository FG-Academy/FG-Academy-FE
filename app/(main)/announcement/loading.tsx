import { Spinner } from "@/6.shared/ui";

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-1 min-h-0 overflow-auto overscroll-contain">
      <Spinner />
    </div>
  );
}
