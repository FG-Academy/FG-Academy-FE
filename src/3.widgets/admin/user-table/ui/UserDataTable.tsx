import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/6.shared/ui/shadcn/ui/dialog";
import { AdminDataTable } from "@/6.shared/ui/admin";
import { UserInfoDialogContent } from "./UserInfoDialogContent";
import useOpenDialogStore from "@/store/useOpenDialogStore";
import type { User } from "@/5.entities/user";
import type { AdminUser } from "@/5.entities/admin/user";
import { ChurchName, Department, Position } from "@/5.entities/user";
import { userColumns } from "./userColumns";

interface UserDataTableProps {
  data: AdminUser[];
  totalPages: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  isFetching?: boolean;
}

export function UserDataTable({
  data,
  totalPages,
  pagination,
  onPaginationChange,
  isFetching = false,
}: UserDataTableProps) {
  const [userId, setUserId] = useState<number>();
  const [userProfile, setUserProfile] = useState<Partial<User>>({
    userId: 0,
    birthDate: "",
    name: "",
    email: "",
    phoneNumber: "",
    churchName: ChurchName.FG,
    departmentName: Department.ETC,
    position: Position.ETC,
    yearsOfService: 0,
    level: "",
  });

  const { open, setOpen } = useOpenDialogStore((state) => state);

  const handleRowClick = (user: AdminUser) => {
    setUserProfile({
      userId: user.userId,
      birthDate: user.birthDate,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      churchName: user.churchName,
      departmentName: user.departmentName,
      position: user.position,
      yearsOfService: user.yearsOfService,
      level: user.level,
    });
    setUserId(user.userId);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AdminDataTable
        columns={userColumns}
        data={data}
        totalPages={totalPages}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        isFetching={isFetching}
        columnVisibility={{
          birthDate: false,
          userId: false,
          email: false,
          phoneNumber: false,
          departmentName: false,
          position: false,
        }}
        onRowClick={handleRowClick}
      />

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-2xl max-h-[90vh] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle>유저 정보 수정</DialogTitle>
          <DialogDescription>
            유저 정보를 확인하고 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
          <UserInfoDialogContent userId={userId!} userProfile={userProfile} />
        </div>

        <DialogFooter className="gap-2 shrink-0 pt-4 border-t">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-gray-200"
            >
              닫기
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="userInfoDialog"
            className="bg-gray-900 hover:bg-gray-800"
          >
            수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
