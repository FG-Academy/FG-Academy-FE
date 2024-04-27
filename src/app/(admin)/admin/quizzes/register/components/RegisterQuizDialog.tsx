"use client";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@/app/(home)/myDashboard/components/svg";
import { useSession } from "next-auth/react";
import { useFetchAdminLectureQuizList } from "@/hooks/useQuizQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import RegisterQuizForm from "./RegisterQuizForm";

interface Props {
  courseId: number;
  lectureId: number;
}

export default function RegisterQuizDialog({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: quizList } = useFetchAdminLectureQuizList(
    accessToken,
    courseId,
    lectureId
  );

  if (!quizList) return <Loading />;

  console.log(quizList);

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      <div className="mt-4 space-y-6">
        {/* //! 이하 내용 반복 */}
        {quizList.map((quiz) => (
          <div key={quiz.quizId} className="border rounded-lg p-4">
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
        ))}

        {/* //! 새로운 퀴즈 등록하기 */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 rounded-lg p-4 flex justify-center items-center cursor-pointer">
              <PlusIcon className="w-6 h-6 text-gray-400 cursor-pointer" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <RegisterQuizForm lectureId={lectureId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
