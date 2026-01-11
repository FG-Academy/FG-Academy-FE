"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, CheckCircle2 } from "lucide-react";
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
import { Card, CardContent } from "@/6.shared/ui/shadcn/ui/card";
import { adminQuizQueries } from "@/5.entities/admin/quiz";
import {
  QuizForm,
  useDeleteQuizMutation,
  useQuizRegisterDialogStore,
} from "@/4.features/admin/manage-quiz";
import { cn } from "@/6.shared/lib/utils";

export function QuizListDialog() {
  const { lectureId } = useQuizRegisterDialogStore();
  const { mutate: deleteQuiz } = useDeleteQuizMutation();

  const { data: quizList, isLoading } = useQuery(
    adminQuizQueries.lectureQuizzes(lectureId)
  );

  if (isLoading || !quizList) {
    return (
      <div className="flex items-center justify-center w-full h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  const handleDelete = (quizId: number) => {
    deleteQuiz(quizId);
  };

  return (
    <div className="flex w-full flex-col h-[600px]">
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight">퀴즈 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          강의에 포함될 퀴즈를 등록하고 관리합니다.
        </p>
      </div>

      <div className="flex-1 -mx-6 px-6">
        <div className="space-y-4 pb-4">
          {quizList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl bg-muted/30">
              <div className="bg-muted rounded-full p-4 mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">등록된 퀴즈가 없습니다</h3>
              <p className="text-sm text-muted-foreground mt-1">
                새로운 퀴즈를 추가하여 학습 경험을 향상시켜보세요.
              </p>
            </div>
          ) : (
            quizList.map((quiz, index) => (
              <Card
                key={quiz.quizId}
                className="group relative transition-all duration-200 hover:shadow-md border-muted-foreground/20 hover:border-primary/50"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-primary transition-colors" />
                <CardContent className="p-5 flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          quiz.quizType === "multiple" ? "default" : "secondary"
                        }
                        className={cn(
                          "uppercase text-[10px] tracking-wider font-bold px-2 py-0.5",
                          quiz.quizType === "multiple"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200"
                        )}
                      >
                        {quiz.quizType === "multiple" ? "객관식" : "주관식"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        #{index + 1}
                      </span>
                    </div>

                    <h3 className="font-medium text-base leading-relaxed text-foreground/90">
                      {quiz.question}
                    </h3>

                    {quiz.quizType === "multiple" &&
                      quiz.quizAnswers.length > 0 && (
                        <div className="bg-muted/40 rounded-md p-3 space-y-1.5 mt-2 border border-border/50">
                          {quiz.quizAnswers.map((answer) => (
                            <div
                              key={answer.id}
                              className={cn(
                                "flex items-start gap-2 text-sm px-2 py-1 rounded",
                                answer.isAnswer &&
                                  "bg-green-50/80 text-green-800 font-medium"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border",
                                  answer.isAnswer
                                    ? "border-green-300 bg-green-100 text-green-700"
                                    : "border-muted-foreground/30 text-muted-foreground"
                                )}
                              >
                                {answer.itemIndex}
                              </span>
                              <span
                                className={cn(
                                  "leading-5",
                                  !answer.isAnswer && "text-muted-foreground"
                                )}
                              >
                                {answer.item}
                              </span>
                              {answer.isAnswer && (
                                <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col gap-1 items-end pl-2 border-l ml-2">
                    {/* Edit Button */}
                    <Dialog>
                      <TooltipProvider>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>수정하기</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
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
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>삭제하기</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>퀴즈 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 퀴즈를 삭제하시겠습니까? 삭제된 데이터는 복구할
                            수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(quiz.quizId)}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                          >
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 mt-auto border-t bg-background">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full h-12 text-base font-medium shadow-sm hover:shadow transition-all"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />새 퀴즈 추가하기
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
            <QuizForm mode="create" lectureId={lectureId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
