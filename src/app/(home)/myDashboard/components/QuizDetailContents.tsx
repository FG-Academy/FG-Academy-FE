import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CheckIcon, PauseIcon, XIcon } from "./svg";
import { DashboardQuizResponse } from "../hooks/useQuizQuery";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: DashboardQuizResponse;
}

export default function QuizDetailContents({ data }: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-4 md:p-2">
      <div className="flex flex-row items-center space-x-4 mt-2 p-2">
        <div>
          {data.isAnswer === 1 ? (
            <CheckIcon className="w-6 h-6" />
          ) : data.isAnswer === 0 ? (
            <PauseIcon className="w-6 h-6" />
          ) : (
            <XIcon className="w-6 h-6" />
          )}
        </div>
        <div className="flex items-center border rounded-lg p-4 w-full justify-between">
          <div className="grid gap-1">
            <h2 className="font-semibold">{data.question} </h2>
            <div className="flex flex-row text-sm text-gray-500 dark:text-gray-400 mr-2">
              {`(${data.multipleAnswer ? "객관식" : "주관식"}) ${
                data.courseTitle
              } > ${data.lectureTitle}`}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="p-2 px-6" size="sm" variant="outline">
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
                  <div className="flex flex-row items-center mt-5 text-start">
                    <div className="text-lg text-black">
                      질문: {data.question}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-row items-center text-base text-black mr-10 mb-2">
                      제출한 답변{")"}
                      {data.isAnswer === 1 ? (
                        <CheckIcon className="w-6 h-6" />
                      ) : data.isAnswer === 0 ? (
                        <PauseIcon className="w-6 h-6" />
                      ) : (
                        <XIcon className="w-6 h-6" />
                      )}
                    </div>
                    {data.multipleAnswer ? (
                      <div>
                        {data.quizAnswers.map((answer) => (
                          <div
                            key={answer.id}
                            className="flex items-center gap-4"
                          >
                            <Checkbox
                              disabled
                              checked={JSON.parse(data.answer).includes(
                                answer.itemIndex
                              )}
                            />
                            <span className="font-medium">{answer.item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>{data.answer}</div>
                    )}

                    {!data.multipleAnswer && (
                      <div>
                        <div className="text-base text-black mt-4 mb-2">
                          피드백{")"}
                        </div>
                        {data.feedback}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
