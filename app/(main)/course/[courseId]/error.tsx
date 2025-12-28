"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error for debugging purposes
  console.error(error);

  return (
    <div className="p-6">
      <div className="mb-3">코스 정보를 불러오지 못했습니다.</div>
      <button className="underline" onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}
