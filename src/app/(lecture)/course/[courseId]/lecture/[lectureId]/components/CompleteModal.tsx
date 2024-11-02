"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  nextUrl: string | null;
};

export default function CompleteModal({ open, nextUrl }: Props) {
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
          {/* <AlertDialogDescription>퀴즈 풀러 가기</AlertDialogDescription> */}
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
