import { Spinner } from "@/6.shared/ui";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Spinner size="large" />
    </div>
  );
}
