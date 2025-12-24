"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/6.shared/ui";
import { useRouter } from "next/navigation";

interface CompleteModalProps {
  open: boolean;
  nextUrl: string | null;
}

export function CompleteModal({ open, nextUrl }: CompleteModalProps) {
  const router = useRouter();

  const handleRedirect = () => {
    if (nextUrl) {
      router.push(nextUrl);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>해당 강의를 수강하였습니다.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>강의 다시 듣기</AlertDialogCancel>
          {nextUrl && (
            <AlertDialogAction className="bg-blue-500" onClick={handleRedirect}>
              {nextUrl.includes("quiz") ? "퀴즈 풀러가기" : "다음 강의로 이동"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
