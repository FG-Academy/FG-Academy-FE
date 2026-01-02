import { PaginationState } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/6.shared/ui/shadcn/ui/dialog";
import { AdminDataTable } from "@/6.shared/ui/admin";
import type { AdminQuizSubmission } from "@/5.entities/admin/quiz";
import {
  QuizGradingDialog,
  useQuizGradingDialogStore,
} from "@/4.features/admin/manage-quiz";
import { quizSubmissionsColumns } from "./quizSubmissionsColumns";

interface QuizSubmissionsDataTableProps {
  data: AdminQuizSubmission[];
  totalPages: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  isFetching?: boolean;
}

export function QuizSubmissionsDataTable({
  data,
  totalPages,
  pagination,
  onPaginationChange,
  isFetching = false,
}: QuizSubmissionsDataTableProps) {
  const { open, setOpen } = useQuizGradingDialogStore();

  return (
    <>
      <AdminDataTable
        columns={quizSubmissionsColumns}
        data={data}
        totalPages={totalPages}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        isFetching={isFetching}
        columnVisibility={{
          userId: false,
          quizId: false,
          level: false,
        }}
      />

      {/* Quiz Grading Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-xl max-h-[85vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>퀴즈 상세 정보</DialogTitle>
            <DialogDescription>
              사용자가 제출한 퀴즈 정보를 확인하고 채점할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <QuizGradingDialog />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
