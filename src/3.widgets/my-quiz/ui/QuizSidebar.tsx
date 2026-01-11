"use client";

import { useState } from "react";
import { cn } from "@/6.shared/lib";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/6.shared/ui";
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { CourseForQuiz, LectureForQuiz } from "@/5.entities/quiz";

interface QuizSidebarProps {
  courses: CourseForQuiz[];
  selectedLecture: LectureForQuiz | null;
  onLectureClick: (lectureId: number) => void;
}

const QuizSidebar = ({
  courses,
  selectedLecture,
  onLectureClick,
}: QuizSidebarProps) => {
  return (
    <aside className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            강의 목록
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {courses.length}개 강의
          </span>
        </div>
        <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-1">
          {courses.map((course) => (
            <CourseItem
              key={course.courseId}
              course={course}
              selectedLecture={selectedLecture}
              onLectureClick={onLectureClick}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 강의 아이템 컴포넌트
 * ───────────────────────────────────────────────────────────────────────────── */

interface CourseItemProps {
  course: CourseForQuiz;
  onLectureClick: (lectureId: number) => void;
  selectedLecture: LectureForQuiz | null;
}

const CourseItem = ({
  course,
  onLectureClick,
  selectedLecture,
}: CourseItemProps) => {
  const isSelectedLectureInCourse = course.lectures.some(
    (lecture) => lecture.lectureId === selectedLecture?.lectureId
  );

  const [isOpen, setIsOpen] = useState(isSelectedLectureInCourse);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={cn(
                "shrink-0 w-1.5 h-8 rounded-full transition-colors",
                isSelectedLectureInCourse ? "bg-primary-blue" : "bg-gray-200"
              )}
            />
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {course.courseTitle}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-400">
                  {course.completedNumber}/{course.lectureCount}강
                </span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-medium",
                    course.averageCorrectRatio >= 0.8
                      ? "bg-green-100 text-green-700"
                      : course.averageCorrectRatio >= 0.5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  )}
                >
                  {Math.round(course.averageCorrectRatio * 100)}%
                </span>
              </div>
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="border-t border-gray-100 bg-gray-50/50">
          {course.lectures.map((lecture) => {
            const isSelected =
              selectedLecture?.lectureId === lecture.lectureId;
            const correctRate =
              lecture.submittedQuizCount > 0
                ? Math.round(
                    (lecture.correctQuizCount / lecture.submittedQuizCount) *
                      100
                  )
                : 0;

            return (
              <button
                key={lecture.lectureId}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors",
                  isSelected
                    ? "bg-primary-blue/10 border-l-2 border-primary-blue"
                    : "hover:bg-gray-100 border-l-2 border-transparent"
                )}
                onClick={() => onLectureClick(lecture.lectureId)}
              >
                <span
                  className={cn(
                    "text-sm truncate",
                    isSelected
                      ? "text-primary-blue font-medium"
                      : "text-gray-600"
                  )}
                >
                  {lecture.lectureTitle}
                </span>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full shrink-0 ml-2",
                    correctRate >= 80
                      ? "bg-green-100 text-green-700"
                      : correctRate >= 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                  )}
                >
                  {lecture.submittedQuizCount}/{lecture.totalQuizCount}
                </span>
              </button>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export { QuizSidebar };
export type { QuizSidebarProps };
