"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueries, type UserLecture } from "@/5.entities/admin/user";
import { UserEditForm, DeleteUserButton } from "@/4.features/admin/manage-user";
import { Loading } from "@/6.shared/ui";
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

interface UserInfoDialogContentProps {
  userId: number;
  userProfile: Partial<IUser>;
}

export function UserInfoDialogContent({
  userId,
  userProfile,
}: UserInfoDialogContentProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const { data: enrollments } = useQuery(userQueries.enrollments(userId));

  const { data: lectures, isLoading: isLecturesLoading } = useQuery(
    userQueries.lecturesDetail(userId, selectedCourseId)
  );

  if (!userProfile || !enrollments) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <DeleteUserButton userId={userId} />
      <UserEditForm userProfile={userProfile} userId={userId} />
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
                        lectures?.map((lecture, index) => (
                          <LectureAccordionItem
                            key={lecture.lectureId}
                            lecture={lecture}
                            index={index}
                            completedNumber={enrollment.completedNumber}
                          />
                        ))
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

interface LectureAccordionItemProps {
  lecture: UserLecture;
  index: number;
  completedNumber: number;
}

function LectureAccordionItem({
  lecture,
  index,
  completedNumber,
}: LectureAccordionItemProps) {
  return (
    <AccordionItem
      className="border w-full"
      value={lecture.lectureId.toString()}
    >
      <AccordionTrigger>
        <div className="flex flex-row w-full items-center">
          <div className="font-bold w-full">
            {lecture.lectureNumber}강. {lecture.lectureTitle}
          </div>
          <div className="w-full">
            퀴즈현황: {lecture.correctQuizCount}/{lecture.quizTotalCount}
          </div>
          <FaCircleCheck
            size={24}
            className={`w-1/2 ${
              index + 1 <= completedNumber ? "text-blue-500" : "text-gray-300"
            }`}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 space-y-2">
        {lecture.quizzes.length > 0 ? (
          <div className="p-2 space-y-4">
            {lecture.quizzes.map((quiz) => {
              if (quiz.quizType === "multiple") {
                return (
                  <div key={quiz.quizId}>
                    <div className="flex flex-row items-center justify-between">
                      <div>(객관식) 질문: {quiz.question}</div>
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
                      {quiz.quizAnswers.map((answer) => {
                        if (quiz.answer && Array.isArray(quiz.answer)) {
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
                              <span className="font-medium">{answer.item}</span>
                            </div>
                          );
                        } else {
                          return <div key={answer.id}>미제출</div>;
                        }
                      })}
                    </div>
                  </div>
                );
              } else if (quiz.quizType === "descriptive") {
                return (
                  <div key={quiz.quizId}>
                    <div className="flex flex-row w-full space-x-2 justify-between items-center p-2">
                      <div>(주관식) 질문: {quiz.question}</div>
                      <div>
                        {quiz.answerType === "정답" ? (
                          <Circle size={24} color="green" />
                        ) : quiz.answerType === "오답" ? (
                          <X size={24} color="red" />
                        ) : (
                          <FaCircleMinus size={24} color="orange" />
                        )}
                      </div>
                    </div>
                    {quiz.answer ? (
                      <div className="border p-2">답변: {quiz.answer}</div>
                    ) : (
                      <div>미제출</div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="p-2">등록된 퀴즈가 없습니다.</div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
