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
import { useQuizQuery } from "../hooks/useQuizQuery";
import { MultipleQuizFormSchema } from "../lib/MultipleQuizFormSchema";
import { QuizSubmit } from "@/model/quiz";

export default function MultipleQuizForm() {
  // reactHook 모음
  const router = useRouter();
  const params = useParams();

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [retry, setRetry] = useState(false);

  const search = parseInt(searchParams.get("quizIndex") as string);

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

  // 단항 덧셈 연산자를 사용하여 문자열을 숫자로 변환
  const courseId = +params.courseId;
  const lectureId = +params.lectureId;

  // 퀴즈 데이터 받아오기
  const { data: quizzes } = useQuizQuery(courseId, lectureId, accessToken);

  // 퀴즈 데이터를 완전히 불러올 때까지 로딩
  if (!quizzes) {
    return <Loading />;
  }

  // 객관식 itemIndex 별로 오름차순 정렬
  quizzes[search - 1].quizAnswers.sort((a, b) => a.itemIndex - b.itemIndex);

  // 정답이 여러 개 있는지 확인
  const isMultipleAnswers =
    quizzes[search - 1].quizAnswers.filter((a) => a.isAnswer).length > 1;

  // 현재 사용자가 제출하지 않은 퀴즈가 남아있는지 확인
  const nextQuiz = quizzes.filter((ele) => {
    return ele.quizSubmits.length === 0 && search !== ele.quizIndex;
  });

  // 정답이 여러 개 있는지 확인(isMultipleAnswer)에 따라 객관식 선택이 다양해짐
  const handleAnswerSelection = (itemIndex: number) => {
    if (isMultipleAnswers) {
      // 여러 개의 정답을 선택할 수 있음
      setSelectedAnswers((prev) =>
        prev.includes(itemIndex)
          ? prev.filter((index) => index !== itemIndex)
          : [...prev, itemIndex]
      );
    } else {
      // 오직 하나의 정답만 선택할 수 있음
      setSelectedAnswers([itemIndex]);
    }
  };

  // const { mutate } = useSubmitMultipleAnswerMutation(
  //   accessToken,
  //   nextQuiz,
  //   courseId,
  //   lectureId
  // );

  //! 퀴즈 제출 버튼을 클릭했을 때 동작
  const onSubmit = async (data: z.infer<typeof MultipleQuizFormSchema>) => {
    // 보낼 데이터 묶음
    const sendData = {
      quizId: quizzes[search - 1].quizId,
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
      // 서버로부터 성공적인 응답을 받았을 때
      queryClient.invalidateQueries();
      setRetry(false);

      toast({
        title: "답변 제출을 완료 했습니다.",
        duration: 10000,
        description: (
          <div className="flex justify-end mt-2 w-[340px] rounded-md p-4">
            {nextQuiz.length > 0 && (
              <Button
                className="shadow-md bg-blue-500 text-white hover:bg-slate-50 hover:text-black"
                onClick={() => {
                  router.push(
                    `/course/${courseId}/lecture/${lectureId}/${nextQuiz[0].quizType}?quizIndex=${nextQuiz[0].quizIndex}`
                  );
                }}
              >
                다음 퀴즈로 이동
              </Button>
            )}
          </div>
        ),
      });

      // 만약 퀴즈 제출이 중복이거나 실패할 경우
    } else if (response.status === 400) {
      const message = await response.json();
      // 오류 처리
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col mt-10 items-center h-full space-y-4 p-4">
        <h1 className="text-2xl">과제</h1>
        <h2>꼼꼼 Check! - 헷갈리는 부분이 없는지 확인해보아요.</h2>
        {quizzes[search - 1].quizSubmits.length > 0 && !retry ? (
          <Card className="w-full p-4 flex flex-col justify-center items-center">
            <CardHeader className="flex flex-col gap-1">
              <div className="text-lg font-bold">제출 현황</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 w-full">
              {quizzes[search - 1].quizSubmits.map((submit, index) => {
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
                      문제: {quizzes[0].question}
                    </div>
                    {quizzes[search - 1].quizAnswers.map((answer) => (
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
                quizzes[search - 1].quizSubmits.length >= 3 ||
                quizzes[search - 1].quizSubmits.some((submit) => {
                  return submit.status === 1;
                })
              }
              onClick={() => setRetry(true)}
              className="w-full bg-blue-500"
            >
              {`${
                quizzes[search - 1].quizSubmits.some((submit) => {
                  return submit.status === 1;
                })
                  ? "정답"
                  : "다시 풀기"
              } (남은 기회 ${
                3 - quizzes[search - 1].quizSubmits.length
              }번 / 총 기회 3번)`}
            </Button>
          </Card>
        ) : (
          <Card className="w-full h-3/4 p-4 pt-10 mx-auto">
            <CardHeader className="flex flex-col gap-1">
              {quizzes[search - 1].quizType === "multiple" ? (
                <div className="text-xl font-bold">객관식 퀴즈</div>
              ) : (
                <div>설문</div>
              )}

              <div className="text-lg leading-none">{quizzes[0].question}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {quizzes[search - 1].quizAnswers.map((answer) => (
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
