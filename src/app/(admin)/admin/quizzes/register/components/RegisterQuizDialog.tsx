"use client";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@/app/(home)/myDashboard/components/svg";
import { useSession } from "next-auth/react";
import { useFetchAdminLectureQuizList } from "@/hooks/useQuizQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import RegisterQuizForm from "./RegisterQuizForm";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuizDeleteMutation } from "../hook/useQuizDeleteMutation";

interface Props {
  courseId: number;
  lectureId: number;
}

export default function RegisterQuizDialog({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { mutate } = useQuizDeleteMutation(accessToken);

  const { data: quizList } = useFetchAdminLectureQuizList(
    accessToken,
    courseId,
    lectureId
  );

  if (!quizList) return <Loading />;

  function sendDelete(quizId: number) {
    mutate(quizId);
  }

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      <div className="mt-4 space-y-6">
        {/* //! 이하 내용 반복 */}
        {quizList.map((quiz) => (
          <div
            key={quiz.quizId}
            id="mainDialogDiv"
            className="flex flex-row border rounded-lg p-4"
          >
            <div id="div1" className="flex-col flex-1">
              <h2 className="text-lg font-semibold">{quiz.question}</h2>
              {quiz.quizAnswers.map((ele) => (
                <p key={ele.id} className="text-sm mt-1 text-gray-600">
                  {ele.itemIndex}번: {ele.item}
                </p>
              ))}

              <Badge className="mt-2" variant="secondary">
                종류:{" "}
                {quiz.quizType === "multiple"
                  ? "객관식"
                  : quiz.quizType === "descriptive"
                  ? "주관식"
                  : "설문"}
              </Badge>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col h-full items-center justify-between">
                <Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DialogTrigger>
                          <Button variant="ghost">
                            <FiEdit className="w-5 h-5 cursor-pointer" />
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>수정</p>
                      </TooltipContent>
                      <DialogContent>
                        <RegisterQuizForm
                          lectureId={lectureId}
                          isEdit={true}
                          quizId={quiz.quizId}
                          quizData={quiz}
                        />
                      </DialogContent>
                    </Tooltip>
                  </TooltipProvider>
                </Dialog>

                <AlertDialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">
                            <MdOutlineDeleteForever className="w-7 h-7 fill-red-600 cursor-pointer" />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>삭제</p>
                      </TooltipContent>
                    </Tooltip>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>퀴즈 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                          정말 퀴즈를 삭제하시겠습니까?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            sendDelete(quiz.quizId);
                          }}
                        >
                          삭제
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </TooltipProvider>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}

        {/* //! 새로운 퀴즈 등록하기 */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 rounded-lg p-4 flex justify-center items-center cursor-pointer">
              <PlusIcon className="w-6 h-6 text-gray-400 cursor-pointer" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <RegisterQuizForm lectureId={lectureId} isEdit={false} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
