"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/6.shared/ui";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <AlertDialogTitle className="text-xl font-bold">강의 수강 완료</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-zinc-500">
              학습을 완료하셨습니다.<br/>
              {nextUrl ? "다음 단계로 이동하시겠습니까?" : "모든 과정을 완료하셨습니다!"}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
          <AlertDialogCancel className="mt-0 w-full sm:w-auto hover:bg-zinc-100">
            다시 듣기
          </AlertDialogCancel>
          {nextUrl && (
            <AlertDialogAction 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none" 
              onClick={handleRedirect}
            >
              {nextUrl.includes("quiz") ? "퀴즈 풀기" : "다음 강의"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
