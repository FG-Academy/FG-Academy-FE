"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  CheckIcon,
  PauseIcon,
  XIcon,
} from "@/app/(home)/myDashboard/components/svg";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuizFeedbackMutation } from "../../hooks/useQuizFeedbackMutate";
import useOpenDescriptiveDialogStore from "@/store/useOpenDescriptiveDialogStore";
import { useMyDescriptiveQuizQuery } from "../../hooks/useQuizQuery";
import { useFetchAdminQuizListQuery } from "../../../hooks/useUserQuery";

interface Props {
  type: string;
}

export default function DescriptiveQuizInfoDialog({ type }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { userId, quizId } = useOpenDescriptiveDialogStore((state) => state);

  const [isCorrected, setIsCorrected] = useState(true);
  const [value, setValue] = useState<string>("");

  function onChange(e: any) {
    setValue(e.target.value);
  }

  const { data: submittedQuizList } = useFetchAdminQuizListQuery(
    accessToken,
    userId
  );

  const { data: descriptiveQuiz } = useMyDescriptiveQuizQuery(
    accessToken,
    userId,
    quizId
  );

  const { mutate } = useQuizFeedbackMutation(accessToken, userId);

  if (!submittedQuizList || !descriptiveQuiz) return <Loading />;

  function onSubmit(quizId: number) {
    mutate({ feedbackComment: value, corrected: isCorrected, quizId: quizId });
  }

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      {submittedQuizList.map((ele, index) => (
        <div key={index}>
          {/* <QuizContents data={ele} /> */}
          <main className="flex flex-col md:gap-4 md:p-2">
            <div className="shadow-sm">
              <div className="flex mt-2">
                {/*  퀴즈 리스트 요소 = 반복되는 컴포넌트 */}
                <div className="flex items-center gap-4 border rounded-lg p-4">
                  <div className="flex flex-row items-start gap-4">
                    <div className="flex-shrink-0">
                      {ele.isAnswer === true ? (
                        <CheckIcon className="w-6 h-6 mx-auto" />
                      ) : ele.isAnswer === null ? (
                        <PauseIcon className="w-6 h-6 mx-auto" />
                      ) : (
                        <XIcon className="w-6 h-6 mx-auto" />
                      )}
                      <div className="flex-shrink-0 text-sm text-gray-500 mt-2">
                        <p>
                          {ele.isAnswer === true
                            ? "정답"
                            : ele.isAnswer === null
                            ? "미채점"
                            : "오답"}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold">{ele.question}</div>
                      <div className="flex flex-wrap gap-2">
                        {ele.submittedAnswer.map((ele2, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 rounded-md p-2"
                          >
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {ele2}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="ml-auto w-16"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // console.log(ele.quizId);
                          // console.log(userId);
                        }}
                      >
                        보기
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex w-full flex-col h-[500px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            퀴즈 상세 정보
                          </DialogTitle>
                          <DialogDescription>
                            <div className="flex justify-center items-center py-4 overflow-y-auto">
                              <div className="bg-white shadow-xl rounded-lg p-4 w-full flex-col">
                                <div className="mt-2 text-center text-2xl font-semibold text-gray-900">
                                  {ele.courseTitle}
                                </div>
                                <p className="mt-2 text-center text-lg text-gray-700">
                                  {ele.lectureTitle}
                                </p>
                                <div className="mt-5 text-start space-y-2">
                                  <p className="text-lg text-black">
                                    {ele.question}
                                  </p>
                                </div>

                                <div className="mt-4">
                                  <p className="text-base font-bold text-black mr-10 mb-2">
                                    제출한 답변
                                  </p>
                                  {ele.submittedAnswer.map((ele2, index) => (
                                    <div key={index} className="mr-4">
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                        {ele2}
                                      </p>
                                    </div>
                                  ))}
                                  <p className="text-base font-bold text-black mt-4 mb-2">
                                    정답 현황
                                  </p>
                                  {ele.isAnswer === true ? (
                                    <div className="flex flex-row">
                                      <CheckIcon className="w-6 h-6" />
                                      <p className="ml-2 my-auto text-sm text-gray-500">
                                        정답
                                      </p>
                                    </div>
                                  ) : ele.isAnswer === null ? (
                                    <div className="flex flex-row mt-2">
                                      <PauseIcon className="w-6 h-6" />
                                      <p className="ml-2 my-auto text-sm text-gray-500">
                                        미채점
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-row">
                                      <XIcon className="w-6 h-6" />
                                      <p className="ml-2 my-auto text-sm text-gray-500">
                                        오답
                                      </p>
                                    </div>
                                  )}
                                  {ele.feedback ? (
                                    <div key={index} className="flex-row mr-4">
                                      <p className="text-base font-bold text-black mt-4 mb-2">
                                        피드백 현황
                                      </p>
                                      <Textarea className="text-black" disabled>
                                        {ele.feedback}
                                      </Textarea>
                                    </div>
                                  ) : (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button className="mt-4">
                                          피드백 남기기
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <div className="h-[200px] overflow-y-scroll">
                                          <DialogHeader>
                                            <DialogTitle>
                                              주관식 퀴즈 채점(피드백)하기
                                            </DialogTitle>
                                            <DialogDescription>
                                              사용자의 주관식 퀴즈를
                                              채점해주세요
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="grid gap-2 p-1 mt-2">
                                            <Textarea
                                              placeholder="피드백을 남겨주세요..."
                                              onChange={onChange}
                                            />
                                          </div>
                                          <DialogFooter className="mt-2">
                                            <div className="flex items-center gap-2">
                                              <Checkbox
                                                id="correct"
                                                onCheckedChange={() =>
                                                  setIsCorrected(true)
                                                }
                                                checked={isCorrected}
                                              />
                                              <Label htmlFor="correct">
                                                정답
                                              </Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Checkbox
                                                id="incorrect"
                                                onCheckedChange={() =>
                                                  setIsCorrected(false)
                                                }
                                                checked={!isCorrected}
                                                // on={setIsSelected(true)}
                                              />
                                              <Label htmlFor="incorrect">
                                                오답
                                              </Label>
                                            </div>
                                            <AlertDialog>
                                              <AlertDialogTrigger asChild>
                                                <Button type="submit">
                                                  채점 완료
                                                </Button>
                                              </AlertDialogTrigger>
                                              <AlertDialogContent>
                                                <AlertDialogHeader>
                                                  <AlertDialogTitle>
                                                    피드백을 제출하시겠습니까?
                                                  </AlertDialogTitle>
                                                  <AlertDialogDescription>
                                                    제출한 피드백은 수정할 수
                                                    없습니다. <br />
                                                    정답이 올바른지 한번 더
                                                    확인해주세요 <br />
                                                    정말 채점을
                                                    완료하시겠습니까?
                                                  </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                  <AlertDialogCancel>
                                                    취소
                                                  </AlertDialogCancel>
                                                  <AlertDialogAction
                                                    onClick={() =>
                                                      onSubmit(ele.quizId)
                                                    }
                                                  >
                                                    확인하고 제출
                                                  </AlertDialogAction>
                                                </AlertDialogFooter>
                                              </AlertDialogContent>
                                            </AlertDialog>
                                          </DialogFooter>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </main>
        </div>
      ))}
    </div>
  );
}
