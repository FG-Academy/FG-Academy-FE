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
  AlertDialogTrigger,
} from "@/6.shared/ui/shadcn/ui/alert-dialog";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { useDeleteUserMutation } from "../api/use-delete-user-mutation";

interface DeleteUserButtonProps {
  userId: number;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const { mutate: deleteUserMutate } = useDeleteUserMutation();

  const handleDelete = () => {
    deleteUserMutate(userId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-24 bg-red-500">유저 삭제</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>유저를 정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            유저의 강의 수강 및 퀴즈 제출 이력이 전부 삭제됩니다.
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
