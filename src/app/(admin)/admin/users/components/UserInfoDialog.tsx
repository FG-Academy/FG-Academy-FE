"use client";

import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import UserForm from "./UserForm";
import {
  useFetchUserEnrollmentsByIdQuery,
  useFetchUserLecturesDetailQuery,
  useFetchUserProfileByIdQuery,
} from "../../hooks/useUserQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCircleCheck, FaCircleMinus } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { Circle, X } from "lucide-react";
import { IUser } from "@/model/user";
import { useState } from "react";

type Props = {
  userId: number;
  userProfile: Partial<IUser>;
};

export function UserInfoDialog({ userId, userProfile }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // const { data: userProfile } = useFetchUserProfileByIdQuery(
  //   accessToken,
  //   userId
  // );

  const { data: enrollments } = useFetchUserEnrollmentsByIdQuery(
    accessToken,
    userId
  );

  const { data: lectures, isLoading: isLecturesLoading } =
    useFetchUserLecturesDetailQuery(accessToken, userId, selectedCourseId);

  console.log(userProfile);

  if (!userProfile || !enrollments) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <UserForm userProfile={userProfile} userId={userId} />
      <div className="space-y-2">
        <h1 className="font-semibold text-lg">수강 중인 강의</h1>
        {enrollments.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {enrollments.map((enrollment) => {
              return (
                <AccordionItem
                  className="border w-full border-gray-400"
                  value={enrollment.id.toString()}
                  key={enrollment.id}
                >
                  <AccordionTrigger
                    onClick={() =>
                      setSelectedCourseId(enrollment.course.courseId)
                    }
                  >
                    <div className="flex flex-row w-full items-center">
                      <div className="font-bold w-full">
                        {enrollment.course.title}
                      </div>
                      <div className="w-full">
                        수강현황: {enrollment.completedNumber}/
                        {enrollment.course.totalLectureLength}
                      </div>
                      <div className="w-full">
                        (
                        {Math.round(
                          (enrollment.completedNumber /
                            enrollment.course.totalLectureLength) *
                            100
                        )}
                        %)
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 space-y-2">
                    <Accordion type="single" collapsible className="w-full">
                      {isLecturesLoading ? (
                        <Loading />
                      ) : (
                        lectures?.map((lecture, index) => {
                          return (
                            <AccordionItem
                              className="border w-full "
                              value={lecture.lectureId.toString()}
                              key={lecture.lectureId}
                            >
                              <AccordionTrigger>
                                <div className="flex flex-row w-full items-center">
                                  <div className="font-bold w-full">
                                    {lecture.lectureNumber}강.{" "}
                                    {lecture.lectureTitle}
                                  </div>
                                  <div className="w-full">
                                    퀴즈현황: {lecture.correctQuizCount}/
                                    {lecture.quizTotalCount}
                                  </div>
                                  <FaCircleCheck
                                    size={24}
                                    className={` w-1/2 ${
                                      index + 1 <= enrollment.completedNumber
                                        ? "text-blue-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                  {/* <div className="w-full">
                                  (
                                  {(lecture.correctQuizCount /
                                    lecture.quizTotalCount) *
                                    100 || 0}
                                  점)
                                </div> */}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="p-4 space-y-2">
                                {lecture.quizzes.length > 0 ? (
                                  <div className="p-2 space-y-4">
                                    {lecture.quizzes.map((quiz) => {
                                      if (quiz.quizType === "multiple") {
                                        // 객관식 퀴즈
                                        return (
                                          <div key={quiz.quizId}>
                                            <div className="flex flex-row items-center justify-between">
                                              <div>
                                                (객관식) 질문: {quiz.question}
                                              </div>
                                              {quiz.answerType === "정답" ? (
                                                <Circle color="green" />
                                              ) : (
                                                <X color="red" />
                                              )}
                                            </div>
                                            <div className="text-gray-400">
                                              시도 횟수({quiz.submitCount}번)
                                            </div>
                                            <div className="border">
                                              {quiz.quizAnswers.map(
                                                (answer) => {
                                                  if (
                                                    quiz.answer &&
                                                    Array.isArray(quiz.answer)
                                                  ) {
                                                    return (
                                                      <div
                                                        className="flex flex-row gap-2 items-center p-2"
                                                        key={answer.id}
                                                      >
                                                        <Checkbox
                                                          className="items-center"
                                                          disabled
                                                          checked={quiz.answer.includes(
                                                            answer.itemIndex as number
                                                          )}
                                                        />
                                                        <span className="font-medium">
                                                          {answer.item}
                                                        </span>
                                                      </div>
                                                    );
                                                  } else {
                                                    return <div>미제출</div>;
                                                  }
                                                }
                                              )}
                                            </div>
                                          </div>
                                        );
                                      } else if (
                                        quiz.quizType === "descriptive"
                                      ) {
                                        // 주관식 퀴즈
                                        return (
                                          <div key={quiz.quizId}>
                                            <div className="flex flex-row w-full space-x-2 justify-between items-center p-2">
                                              <div>
                                                (주관식) 질문: {quiz.question}
                                              </div>
                                              <div className="">
                                                {quiz.answerType === "정답" ? (
                                                  <Circle
                                                    size={24}
                                                    color="green"
                                                  />
                                                ) : quiz.answerType ===
                                                  "오답" ? (
                                                  <X size={24} color="red" />
                                                ) : (
                                                  <FaCircleMinus
                                                    size={24}
                                                    color="orange"
                                                  />
                                                )}
                                              </div>
                                            </div>
                                            {quiz.answer ? (
                                              <div className="border p-2">
                                                답변: {quiz.answer}
                                              </div>
                                            ) : (
                                              <div>미제출</div>
                                            )}
                                          </div>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })}
                                  </div>
                                ) : (
                                  <div className="p-2">
                                    등록된 퀴즈가 없습니다.
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })
                      )}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="text-center">수강 신청한 이력이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
