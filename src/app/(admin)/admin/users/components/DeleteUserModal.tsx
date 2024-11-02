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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "../hook/useDeleteUserMutation";
import { useSession } from "next-auth/react";

type Props = {
  userId: number;
};

export default function DeleteUserModal({ userId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { mutate: deleteUserMutate } = useDeleteUserMutation();

  const deleteUser = () => {
    deleteUserMutate({ accessToken, userId });
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
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => deleteUser()}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
