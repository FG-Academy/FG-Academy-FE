"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Play, CheckCircle2, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/6.shared/ui";
import { ADMIN_LEVELS } from "@/6.shared/config";
import { cn } from "@/6.shared/lib";
import type { CourseLecture } from "../model/lecture.type";

type Props = {
  completedCount: number;
  lectures: CourseLecture[];
  isTaking: boolean | null;
  lastStudyLectureId: number | null;
  courseCurriculum: string;
};

const LectureList = ({
  lectures,
  isTaking,
  lastStudyLectureId,
  completedCount,
  courseCurriculum,
}: Props) => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.level
    ? ADMIN_LEVELS.includes(session.user.level)
    : false;
  const isSeminar = courseCurriculum === "세미나";
  const canShowContent = isTaking !== false && lastStudyLectureId;

  return (
    <Accordion type="multiple" className="space-y-2">
      {lectures.map((lecture, index) => {
        const isCompleted = index < completedCount;
        const isAccessible = isAdmin || isSeminar || isCompleted;
        const isCurrent = lecture.lectureId === lastStudyLectureId;

        return (
          <AccordionItem
            disabled={!isAccessible}
            key={lecture.lectureId}
            value={`item-${index}`}
            className={cn(
              "border rounded-xl overflow-hidden transition-all",
              isCompleted
                ? "bg-green-50/50 border-green-200"
                : isCurrent
                ? "bg-primary-blue/5 border-primary-blue/30"
                : isAccessible
                ? "bg-white border-gray-200 hover:border-gray-300"
                : "bg-gray-50 border-gray-100 opacity-60"
            )}
          >
            <AccordionTrigger
              className={cn(
                "px-4 py-3 text-left hover:no-underline",
                !isAccessible && "cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                {/* 상태 아이콘 */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    isCompleted
                      ? "bg-green-100"
                      : isCurrent
                      ? "bg-primary-blue/10"
                      : isAccessible
                      ? "bg-gray-100"
                      : "bg-gray-100"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : !isAccessible ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isCurrent ? "text-primary-blue" : "text-gray-500"
                      )}
                    >
                      {lecture.lectureNumber}
                    </span>
                  )}
                </div>

                {/* 강의 제목 */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      isCompleted
                        ? "text-green-700"
                        : isCurrent
                        ? "text-primary-blue"
                        : isAccessible
                        ? "text-gray-800"
                        : "text-gray-400"
                    )}
                  >
                    {lecture.lectureNumber}강. {lecture.title}
                  </p>
                  {isCurrent && (
                    <span className="text-xs text-primary-blue">학습 중</span>
                  )}
                  {/* 완료 뱃지 */}
                  {isCompleted && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full shrink-0">
                      완료
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>

            {canShowContent && (
              <AccordionContent className="pt-0 pb-4 px-4">
                <div className="ml-11">
                  <Link
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-blue 
                              hover:text-primary-blue/80 transition-colors group"
                    href={`/course/${lecture.courseId}/lecture/${lecture.lectureId}`}
                  >
                    <Play className="w-3.5 h-3.5" fill="currentColor" />
                    강의 보기
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export { LectureList };
