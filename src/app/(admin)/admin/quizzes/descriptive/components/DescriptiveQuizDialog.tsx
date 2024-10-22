"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuizFeedbackMutation } from "../../hooks/useQuizFeedbackMutate";
import useOpenDescriptiveDialogStore from "@/store/useOpenDescriptiveDialogStore";
import { useMyDescriptiveQuizQuery } from "../../hooks/useQuizQuery";
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

export default function DescriptiveQuizDialog() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { userId, quizId } = useOpenDescriptiveDialogStore((state) => state);

  function onChange(e: any) {
    setValue(e.target.value);
  }

  const { data: descriptiveQuiz } = useMyDescriptiveQuizQuery(
    accessToken,
    userId,
    quizId
  );

  const { mutate } = useQuizFeedbackMutation(accessToken, userId);

  const [isCorrected, setIsCorrected] = useState(descriptiveQuiz?.status === 1);
  const [value, setValue] = useState<string>(
    descriptiveQuiz?.feedbackComment ?? ""
  );

  useEffect(() => {
    if (descriptiveQuiz) {
      setIsCorrected(descriptiveQuiz.status === 1);
      setValue(descriptiveQuiz.feedbackComment!);
    }
  }, [descriptiveQuiz]);

  if (!descriptiveQuiz) return <Loading />;

  function onSubmit(quizId: number) {
    mutate({ feedbackComment: value, corrected: isCorrected, quizId: quizId });
  }

  return (
    <AlertDialog>
      <div className="flex flex-col justify-center w-full h-full p-2 space-y-6 overflow-y-auto border">
        <div>
          <div className="text-xs">{`${descriptiveQuiz.quiz.lecture.course.title} > ${descriptiveQuiz.quiz.lecture.title} `}</div>
          <div className="text-lg font-bold">
            문제: {descriptiveQuiz.quiz.question}
          </div>
        </div>
        <div>
          주관식 퀴즈 채점 현황:{" "}
          {descriptiveQuiz.status === 0
            ? "미채점"
            : descriptiveQuiz.status === 1
            ? "정답"
            : "오답"}
        </div>
        {descriptiveQuiz.multipleAnswer === 1 ? (
          <div>
            {descriptiveQuiz.quiz.quizAnswers.map((answer) => {
              return (
                <div
                  className="flex flex-row gap-2 items-center p-2"
                  key={answer.id}
                >
                  <Checkbox
                    className="items-center"
                    disabled
                    checked={JSON.parse(descriptiveQuiz.answer).includes(
                      answer.itemIndex
                    )}
                  />
                  <span className="font-medium">{answer.item}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div>
              <div className="text-sm">제출한 답변</div>
              <div className="p-4 border">{descriptiveQuiz.answer}</div>
            </div>
            <div>
              <div className="text-sm">피드백 내용</div>
              <Textarea
                disabled={descriptiveQuiz.status !== 0}
                value={value}
                placeholder="피드백을 남겨주세요..."
                onChange={onChange}
              />
              <div className="flex flex-row mt-2 space-x-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Checkbox
                    disabled={descriptiveQuiz.status !== 0}
                    id="correct"
                    onCheckedChange={() => setIsCorrected(true)}
                    checked={isCorrected}
                  />
                  <Label htmlFor="correct">정답</Label>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Checkbox
                    disabled={descriptiveQuiz.status !== 0}
                    id="incorrect"
                    onCheckedChange={() => setIsCorrected(false)}
                    checked={!isCorrected}
                  />
                  <Label htmlFor="incorrect">오답</Label>
                </div>
              </div>
            </div>
            <AlertDialogTrigger asChild>
              <Button disabled={descriptiveQuiz.status !== 0} type="submit">
                피드백 남기기
              </Button>
            </AlertDialogTrigger>
          </>
        )}
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>피드백을 제출하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            제출한 피드백은 수정할 수 없습니다. <br />
            정답이 올바른지 한번 더 확인해주세요 <br />
            정말 채점을 완료하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onSubmit(descriptiveQuiz.quiz.quizId)}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
