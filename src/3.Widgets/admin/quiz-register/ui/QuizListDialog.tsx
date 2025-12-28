"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Badge } from "@/6.shared/ui/shadcn/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/6.shared/ui/shadcn/ui/dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/6.shared/ui/shadcn/ui/tooltip";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import {
  QuizForm,
  useDeleteQuizMutation,
  useQuizRegisterDialogStore,
} from "@/4.features/admin/manage-quiz";

export function QuizListDialog() {
  const { lectureId } = useQuizRegisterDialogStore();
  const { mutate: deleteQuiz } = useDeleteQuizMutation();

  const { data: quizList, isLoading } = useQuery(
    adminQuizQueries.lectureQuizzes(lectureId)
  );

  if (isLoading || !quizList) {
    return (
      <div className="flex items-center justify-center w-full h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const handleDelete = (quizId: number) => {
    deleteQuiz(quizId);
  };

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      <div className="mt-4 space-y-6">
        {quizList.map((quiz) => (
          <div
            key={quiz.quizId}
            className="flex flex-row border rounded-lg p-4"
          >
            <div className="flex-col flex-1">
              <h2 className="text-lg font-semibold">{quiz.question}</h2>
              {quiz.quizAnswers.map((answer) => (
                <p key={answer.id} className="text-sm mt-1 text-gray-600">
                  {answer.itemIndex}번: {answer.item}
                </p>
              ))}
              <Badge className="mt-2" variant="secondary">
                종류:{" "}
                {quiz.quizType === "multiple"
                  ? "객관식"
                  : quiz.quizType === "descriptive"
                  ? "주관식"
                  : "설문"}
              </Badge>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col h-full items-center justify-between">
                {/* Edit Button */}
                <Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>수정</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent>
                    <QuizForm
                      mode="edit"
                      quizId={quiz.quizId}
                      initialData={quiz}
                    />
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <AlertDialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>삭제</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>퀴즈 삭제</AlertDialogTitle>
                      <AlertDialogDescription>
                        정말 퀴즈를 삭제하시겠습니까?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(quiz.quizId)}>
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Quiz */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 rounded-lg p-4 flex justify-center items-center cursor-pointer hover:bg-muted/50">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <QuizForm mode="create" lectureId={lectureId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
