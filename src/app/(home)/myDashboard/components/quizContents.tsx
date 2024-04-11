import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QuizList } from "@/model/dashboard";
import { CheckIcon, XIcon } from "./svg";
import QuizDetail from "./quizDetail";

interface dataProps {
  data: QuizList;
}

export default function QuizContents({ data }: dataProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-4 md:p-2">
      <div className="shadow-sm">
        <div className="grid gap-4 mt-2">
          {/*  퀴즈 리스트 요소 = 반복되는 컴포넌트 */}
          <div className="flex items-center gap-4 border rounded-lg p-4">
            {data.isAnswer === true ? (
              <CheckIcon className="w-6 h-6" />
            ) : (
              <XIcon className="w-6 h-6" />
            )}
            <div className="grid gap-1">
              <h2 className="font-semibold">{data.question} </h2>
              <div className="flex">
                {data.submittedAnswer.map((ele, index) => (
                  <div key={index} className="flex-row mr-4">
                    <p className="flex-row text-sm text-gray-500 dark:text-gray-400 mr-2">
                      {ele}번: {data.submittedAnswersContents[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto w-16" size="sm" variant="outline">
                  보기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    퀴즈 상세 정보
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex justify-center items-center py-4">
                      <div className="bg-white shadow-xl rounded-lg p-4 w-full flex-col">
                        <h2 className="mt-2 text-center text-2xl font-semibold text-gray-900">
                          {data.courseTitle}
                        </h2>
                        <p className="mt-2 text-center text-lg text-gray-700">
                          {data.lectureTitle}
                        </p>
                        <div className="mt-5 text-start space-y-2">
                          <p className="text-lg text-black">{data.question}</p>
                        </div>

                        <div className="mt-4">
                          <p className="text-base text-black mr-10 mb-2">
                            제출한 답변{")"}
                          </p>
                          {data.submittedAnswer.map((ele, index) => (
                            <div key={index} className="mr-4">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                {ele}번: {data.submittedAnswersContents[index]}
                              </p>
                            </div>
                          ))}
                          <p className="text-base text-black mt-4 mb-2">
                            정답{")"}
                          </p>
                          {data.correctAnswers.map((ele, index) => (
                            <div key={index} className="flex-row mr-4">
                              <p className="flex-row text-sm text-gray-500 dark:text-gray-400 mr-2">
                                {ele.itemIndex}번: {ele.item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </main>
  );
}
