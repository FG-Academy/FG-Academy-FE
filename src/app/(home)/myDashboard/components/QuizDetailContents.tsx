import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QuizList as IQuizList } from "@/model/dashboard";
import { Check, X } from "lucide-react";
import { CheckIcon, PauseIcon, XIcon } from "./svg";

interface dataProps {
  data: IQuizList;
}

export default function QuizDetailContents({ data }: dataProps) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(data);
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-4 md:p-2">
      <div className="shadow-sm">
        <div className="grid gap-4 mt-2">
          {/*  퀴즈 리스트 요소 = 반복되는 컴포넌트 */}
          <div className="flex items-center gap-4 border rounded-lg p-4">
            {data.isAnswer === true ? (
              <CheckIcon className="w-6 h-6" />
            ) : data.isAnswer === null ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <XIcon className="w-6 h-6" />
            )}

            {/* {data.isAnswer === true ? (
              <Check className="w-6 h-6" color="green" />
            ) : (
              <X className="w-6 h-6" color="red" />
            )} */}
            <div className="grid gap-1">
              <h2 className="font-semibold">{data.question} </h2>
              <div className="flex">
                {data.submittedAnswer.map((ele, index) => (
                  <div key={index} className="flex-row mr-4">
                    <div className="flex-row text-sm text-gray-500 dark:text-gray-400 mr-2">
                      {ele}번: {data.submittedAnswersContents[index]}
                    </div>
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
                </DialogHeader>
                <div className="flex justify-center items-center py-4">
                  <div className="bg-white shadow-xl rounded-lg p-4 w-full flex-col">
                    <div className="mt-2 text-center text-2xl font-semibold text-gray-900">
                      {data.courseTitle}
                    </div>
                    <div className="mt-2 text-center text-lg text-gray-700">
                      {data.lectureTitle}
                    </div>
                    <div className="mt-5 text-start space-y-2">
                      <div className="text-lg text-black">{data.question}</div>
                    </div>

                    <div className="mt-4">
                      <div className="text-base text-black mr-10 mb-2">
                        제출한 답변{")"}
                      </div>
                      {data.submittedAnswer.map((ele, index) => (
                        <div key={index} className="mr-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                            {ele}번: {data.submittedAnswersContents[index]}
                          </div>
                        </div>
                      ))}
                      <div className="text-base text-black mt-4 mb-2">
                        정답{")"}
                      </div>
                      {data.correctAnswers.map((ele, index) => (
                        <div key={index} className="flex-row mr-4">
                          <div className="flex-row text-sm text-gray-500 dark:text-gray-400 mr-2">
                            {ele.itemIndex}번: {ele.item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </main>
  );
}
