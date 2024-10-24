"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Loading from "../../loading";
import { useOneQuizQuery } from "../../hooks/useQuizQuery";
import { MultipleQuizFormSchema } from "../lib/MultipleQuizFormSchema";

export default function MultipleQuizForm() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [retry, setRetry] = useState(false);
  const [isMultipleAnswers, setMultipleAnswers] = useState(false);

  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const currentQuizId = parseInt(searchParams.get("quizId") as string);
  const { data: quiz } = useOneQuizQuery(currentQuizId, accessToken);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof MultipleQuizFormSchema>>({
    resolver: zodResolver(MultipleQuizFormSchema),
  });

  // 선택된 답변을 form에 반영
  useEffect(() => {
    setValue("items", selectedAnswers);
  }, [selectedAnswers, setValue]);

  useEffect(() => {
    setValue("items", []);
    setSelectedAnswers([]);
  }, [currentQuizId]);

  useEffect(() => {
    if (quiz && quiz.quizAnswers.filter((qA) => qA.isAnswer).length > 1) {
      setMultipleAnswers(true);
    }
  }, [quiz]);

  if (!quiz) {
    return <Loading />;
  }

  // 정답이 여러 개 있는지 확인(isMultipleAnswer)에 따라 객관식 선택이 다양해짐
  const handleAnswerSelection = (itemIndex: number) => {
    if (isMultipleAnswers) {
      setSelectedAnswers((prev) =>
        prev.includes(itemIndex)
          ? prev.filter((index) => index !== itemIndex)
          : [...prev, itemIndex]
      );
    } else {
      setSelectedAnswers([itemIndex]);
    }
  };

  //! 퀴즈 제출 버튼을 클릭했을 때 동작
  const onSubmit = async (data: z.infer<typeof MultipleQuizFormSchema>) => {
    // 보낼 데이터 묶음
    const sendData = {
      quizId: quiz.quizId,
      multipleAnswer: 1,
      answer: JSON.stringify(data.items),
    };

    // quizSubmits에 저장
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/answer`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(sendData),
      }
    );
    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: ["myCourse"] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      setRetry(false);

      toast({
        title: "답변 제출을 완료 했습니다.",
        duration: 10000,
      });
    } else if (response.status === 400) {
      const message = await response.json();
      toast({
        title: message.message,
        variant: "destructive",
        duration: 3000,
      });
    } else {
      toast({
        title: "답변 제출에 실패했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full space-y-8">
      <div className="flex flex-col mt-10 items-center h-full space-y-4 p-4">
        <h1 className="text-2xl">과제</h1>
        <h2>꼼꼼 Check! - 헷갈리는 부분이 없는지 확인해보아요.</h2>
        {quiz.quizSubmits.length > 0 && !retry ? (
          <Card className="w-full p-4 flex flex-col justify-center items-center">
            <CardHeader className="flex flex-col gap-1">
              <div className="text-lg font-bold">제출 현황</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 w-full">
              {quiz.quizSubmits.map((submit, index) => {
                return (
                  <div
                    key={submit.id}
                    className={`border p-4 rounded-md ${
                      submit.status === 2
                        ? "border-red-500"
                        : submit.status === 1
                        ? "border-green-500"
                        : ""
                    }`}
                  >
                    <div className="mb-4 text-lg text-gray-500">{`<${
                      index + 1
                    }번째 제출 답안>`}</div>
                    <div className="text-lg leading-none mb-4">
                      문제: {quiz.question}
                    </div>
                    {quiz.quizAnswers.map((answer) => (
                      <div key={answer.id} className="flex items-center gap-4">
                        <Checkbox
                          {...register("items")}
                          disabled
                          checked={JSON.parse(submit.answer).includes(
                            answer.itemIndex as number
                          )}
                          onCheckedChange={() =>
                            handleAnswerSelection(answer.itemIndex)
                          }
                        />
                        <span className="font-medium">{answer.item}</span>
                      </div>
                    ))}

                    <div
                      className={`mt-4 ${
                        submit.status === 1 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {submit.status === 1 ? "정답입니다." : "오답입니다."}
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <Button
              disabled={
                quiz.quizSubmits.length >= 3 ||
                quiz.quizSubmits.some((submit) => {
                  return submit.status === 1;
                })
              }
              onClick={() => setRetry(true)}
              className="w-full bg-blue-500"
            >
              {`${
                quiz.quizSubmits.some((submit) => {
                  return submit.status === 1;
                })
                  ? "정답"
                  : "다시 풀기"
              } (남은 기회 ${3 - quiz.quizSubmits.length}번 / 총 기회 3번)`}
            </Button>
          </Card>
        ) : (
          <Card className="w-full h-3/4 p-4 pt-10 mx-auto">
            <CardHeader className="flex flex-col gap-1">
              {quiz.quizType === "multiple" ? (
                <div className="text-xl font-bold">객관식 퀴즈</div>
              ) : (
                <div>설문</div>
              )}
              <div className="text-lg leading-none">{quiz.question}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {quiz.quizAnswers.map((answer) => (
                <div key={answer.itemIndex} className="flex items-center gap-4">
                  <Checkbox
                    {...register("items")}
                    checked={selectedAnswers.includes(answer.itemIndex)}
                    onCheckedChange={() =>
                      handleAnswerSelection(answer.itemIndex)
                    }
                  />
                  <span className="font-medium">{answer.item}</span>
                </div>
              ))}
              {errors.items && (
                <p className="text-red-600">{errors.items.message}</p>
              )}

              <Button type="submit">답변 제출</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </form>
  );
}
