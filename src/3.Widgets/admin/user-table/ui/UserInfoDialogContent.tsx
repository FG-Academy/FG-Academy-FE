"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueries, type UserLecture } from "@/5.entities/admin/user";
import { UserEditForm, DeleteUserButton } from "@/4.features/admin/manage-user";
import { Loading } from "@/6.shared/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/6.shared/ui/shadcn/ui/accordion";
import { Card } from "@/6.shared/ui/shadcn/ui/card";
import { Badge } from "@/6.shared/ui/shadcn/ui/badge";
import { Progress } from "@/6.shared/ui/shadcn/ui/progress";
import { Separator } from "@/6.shared/ui/shadcn/ui/separator";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Trophy,
  MoreHorizontal,
} from "lucide-react";
import type { User } from "@/5.entities/user";
import { useState } from "react";

interface UserInfoDialogContentProps {
  userId: number;
  userProfile: Partial<User>;
}

export function UserInfoDialogContent({
  userId,
  userProfile,
}: UserInfoDialogContentProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const { data: enrollments } = useQuery(userQueries.enrollments(userId));

  const { data: lectures, isLoading: isLecturesLoading } = useQuery(
    userQueries.lecturesDetail(userId, selectedCourseId)
  );

  if (!userProfile || !enrollments) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <DeleteUserButton userId={userId} />
        </div>
        <UserEditForm userProfile={userProfile} userId={userId} />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            수강 중인 강의
          </h3>
        </div>

        {enrollments.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-3">
            {enrollments.map((enrollment) => {
              const progressPercent =
                enrollment.course.totalLectureLength > 0
                  ? Math.round(
                      (enrollment.completedNumber /
                        enrollment.course.totalLectureLength) *
                        100
                    )
                  : 0;

              return (
                <AccordionItem
                  className="px-4 border rounded-lg shadow-sm bg-card"
                  value={enrollment.id.toString()}
                  key={enrollment.id}
                >
                  <AccordionTrigger
                    className="py-4 hover:no-underline"
                    onClick={() =>
                      setSelectedCourseId(enrollment.course.courseId)
                    }
                  >
                    <div className="flex flex-col w-full gap-3 pr-4 text-left">
                      <div className="flex items-start justify-between w-full">
                        <span className="mr-2 text-base font-bold line-clamp-1">
                          {enrollment.course.title}
                        </span>
                        <Badge
                          variant={
                            progressPercent === 100 ? "default" : "secondary"
                          }
                          className="shrink-0"
                        >
                          {progressPercent === 100 ? "수강 완료" : "수강 중"}
                        </Badge>
                      </div>

                      <div className="w-full space-y-1.5">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>진도율 {progressPercent}%</span>
                          <span>
                            {enrollment.completedNumber} /{" "}
                            {enrollment.course.totalLectureLength} 강의
                          </span>
                        </div>
                        <Progress
                          value={progressPercent}
                          className="h-2"
                          indicatorColor="bg-primary"
                        />
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-2 pb-4">
                    <div className="p-1 border rounded-md bg-muted/30">
                      {isLecturesLoading ? (
                        <div className="flex justify-center py-8">
                          <Loading />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {lectures?.length === 0 && (
                            <div className="py-4 text-sm text-center text-muted-foreground">
                              등록된 강의가 없습니다.
                            </div>
                          )}
                          {lectures?.map((lecture, index) => (
                            <LectureAccordionItem
                              key={lecture.lectureId}
                              lecture={lecture}
                              index={index}
                              completedNumber={enrollment.completedNumber}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg bg-muted/10">
            <BookOpen className="w-10 h-10 mb-2 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              수강 신청한 강의가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface LectureAccordionItemProps {
  lecture: UserLecture;
  index: number;
  completedNumber: number;
}

function LectureAccordionItem({
  lecture,
  index,
  completedNumber,
}: LectureAccordionItemProps) {
  const isCompleted = index + 1 <= completedNumber;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={lecture.lectureId.toString()}
        className="border-b-0"
      >
        <AccordionTrigger className="px-3 py-3 transition-colors rounded-md hover:no-underline hover:bg-muted/50">
          <div className="flex flex-row items-center w-full gap-2 pr-2">
            <div
              className={`
                flex items-center justify-center w-6 h-6 rounded-full shrink-0
                ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle2 size={14} />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span
                className={`text-sm font-medium line-clamp-2 ${
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {lecture.lectureTitle}
              </span>
            </div>

            {lecture.quizTotalCount > 0 && (
              <div className="flex items-center gap-1.5 bg-background border px-2 py-0.5 rounded-full shadow-sm shrink-0">
                <Trophy
                  size={12}
                  className={
                    lecture.correctQuizCount === lecture.quizTotalCount
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                  }
                />
                <span className="text-xs font-medium whitespace-nowrap">
                  {lecture.correctQuizCount}/{lecture.quizTotalCount}
                </span>
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3">
          <div className="pr-1 pl-9">
            {lecture.quizzes.length > 0 ? (
              <div className="grid gap-3 pt-1">
                {lecture.quizzes.map((quiz, i) => (
                  <Card
                    key={quiz.quizId}
                    className="border shadow-none bg-background/50"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 px-1.5 font-normal"
                            >
                              Q{i + 1}.{" "}
                              {quiz.quizType === "multiple"
                                ? "객관식"
                                : "주관식"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              시도 {quiz.submitCount}회
                            </span>
                          </div>
                          <p className="text-sm font-medium leading-relaxed">
                            {quiz.question}
                          </p>
                        </div>

                        <div className="shrink-0">
                          {quiz.answerType === "정답" ? (
                            <Badge
                              variant="default"
                              className="bg-green-600 hover:bg-green-700 gap-1 pl-1.5"
                            >
                              <CheckCircle2 size={12} /> 정답
                            </Badge>
                          ) : quiz.answerType === "오답" ? (
                            <Badge
                              variant="destructive"
                              className="gap-1 pl-1.5"
                            >
                              <XCircle size={12} /> 오답
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700 hover:bg-orange-200 gap-1 pl-1.5 border-orange-200"
                            >
                              <HelpCircle size={12} />{" "}
                              {quiz.answerType || "미채점"}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Separator className="bg-border/60" />

                      <div className="text-sm">
                        {quiz.quizType === "multiple" ? (
                          <div className="space-y-2">
                            {quiz.quizAnswers.map((answer) => {
                              const isSelected =
                                Array.isArray(quiz.answer) &&
                                quiz.answer.includes(
                                  answer.itemIndex as number
                                );
                              const isCorrect = answer.isAnswer;
                              const isWrongSelection = isSelected && !isCorrect;
                              const isMissedCorrect = !isSelected && isCorrect;

                              return (
                                <div
                                  key={answer.id}
                                  className={`
                                            flex items-center gap-3 p-2.5 rounded-md border text-sm transition-colors
                                            ${
                                              isSelected && isCorrect
                                                ? "bg-green-50 border-green-300 text-green-700 font-medium"
                                                : isWrongSelection
                                                ? "bg-red-50 border-red-300 text-red-700 font-medium"
                                                : isMissedCorrect
                                                ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                                                : "bg-transparent border-transparent hover:bg-muted/50 text-muted-foreground"
                                            }
                                          `}
                                >
                                  <div
                                    className={`
                                              flex items-center justify-center w-5 h-5 rounded border text-[10px]
                                              ${
                                                isSelected && isCorrect
                                                  ? "bg-green-600 border-green-600 text-white"
                                                  : isWrongSelection
                                                  ? "bg-red-600 border-red-600 text-white"
                                                  : isMissedCorrect
                                                  ? "bg-yellow-500 border-yellow-500 text-white"
                                                  : "bg-background border-input"
                                              }
                                            `}
                                  >
                                    {isSelected && isCorrect && (
                                      <CheckCircle2 size={12} />
                                    )}
                                    {isWrongSelection && <XCircle size={12} />}
                                    {isMissedCorrect && (
                                      <CheckCircle2 size={12} />
                                    )}
                                  </div>
                                  <span className="flex-1">{answer.item}</span>
                                  {isCorrect && (
                                    <span className="text-xs text-green-600 font-medium shrink-0">
                                      정답
                                    </span>
                                  )}
                                  {isWrongSelection && (
                                    <span className="text-xs text-red-600 font-medium shrink-0">
                                      오답 선택
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-3 text-sm rounded-md bg-muted/50">
                            {quiz.answer ? (
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                  제출 답안
                                </p>
                                <p className="text-foreground">{quiz.answer}</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <AlertCircle size={14} />
                                <span>제출된 답안이 없습니다.</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 py-2 text-sm italic text-muted-foreground">
                <MoreHorizontal size={14} />
                <span>등록된 퀴즈가 없습니다.</span>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
