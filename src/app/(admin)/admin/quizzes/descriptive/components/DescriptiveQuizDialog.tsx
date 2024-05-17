"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuizFeedbackMutation } from "../../hooks/useQuizFeedbackMutate";
import useOpenDescriptiveDialogStore from "@/store/useOpenDescriptiveDialogStore";
import { useMyDescriptiveQuizQuery } from "../../hooks/useQuizQuery";

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

  if (!descriptiveQuiz) return <Loading />;

  function onSubmit(quizId: number) {
    mutate({ feedbackComment: value, corrected: isCorrected, quizId: quizId });
  }

  return (
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
      <Button
        disabled={descriptiveQuiz.status !== 0}
        onClick={() => onSubmit(descriptiveQuiz.quiz.quizId)}
        type="submit"
      >
        피드백 남기기
      </Button>
    </div>
  );
}
