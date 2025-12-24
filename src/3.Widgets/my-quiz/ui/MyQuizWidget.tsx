"use client";

import { Suspense, useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Spinner } from "@/6.shared/ui";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
} from "lucide-react";
import {
  quizQueries,
  LectureForQuiz,
  CourseForQuiz,
  QuizStatCard,
} from "@/5.entities/quiz";
import { QuizSidebar } from "./QuizSidebar";
import { QuizListPanel } from "./QuizListPanel";

const MyQuizWidget = () => {
  const { data: courses } = useSuspenseQuery(quizQueries.coursesForQuiz());

  const [selectedLecture, setSelectedLecture] = useState<LectureForQuiz>(
    courses[0]?.lectures[0]
  );

  const handleLectureClick = (lectureId: number) => {
    setSelectedLecture(
      courses
        .map((c) => c.lectures.find((l) => l.lectureId === lectureId))
        .find(Boolean) as LectureForQuiz
    );
  };

  // 전체 통계 계산
  const totalStats = useMemo(() => {
    let total = 0;
    let correct = 0;
    let incorrect = 0;

    courses.forEach((course: CourseForQuiz) => {
      course.lectures.forEach((lecture) => {
        total += lecture.submittedQuizCount;
        correct += lecture.correctQuizCount;
        incorrect += lecture.submittedQuizCount - lecture.correctQuizCount;
      });
    });

    return { total, correct, incorrect };
  }, [courses]);

  if (!courses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <ClipboardList className="w-16 h-16 mb-4 opacity-40" />
        <p className="text-lg font-medium mb-1">제출한 퀴즈가 없습니다</p>
        <p className="text-sm">강의를 수강하고 퀴즈를 풀어보세요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* 헤더 */}
      <header className="px-6 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-primary-blue rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            퀴즈 피드백
          </h2>
        </div>
        <p className="text-sm text-gray-500 ml-4">
          내가 제출한 퀴즈와 채점 현황을 확인해보세요
        </p>
      </header>

      {/* 전체 통계 카드 */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuizStatCard
            icon={<ClipboardList className="w-5 h-5" />}
            label="총 제출"
            value={totalStats.total}
            color="blue"
          />
          <QuizStatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="정답"
            value={totalStats.correct}
            color="green"
          />
          <QuizStatCard
            icon={<XCircle className="w-5 h-5" />}
            label="오답"
            value={totalStats.incorrect}
            color="red"
          />
          <QuizStatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="정답률"
            value={`${totalStats.total > 0 ? Math.round((totalStats.correct / totalStats.total) * 100) : 0}%`}
            color="purple"
          />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col md:flex-row w-full border-t border-gray-100">
        {/* 사이드바 - 강의 목록 */}
        <QuizSidebar
          courses={courses}
          selectedLecture={selectedLecture}
          onLectureClick={handleLectureClick}
        />

        {/* 메인 영역 - 퀴즈 목록 */}
        <main className="flex-1 min-w-0">
          {selectedLecture ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <Spinner />
                </div>
              }
            >
              <QuizListPanel selectedLecture={selectedLecture} />
            </Suspense>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FileText className="w-12 h-12 mb-3 opacity-50" />
              <p>강의를 선택해주세요</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export { MyQuizWidget };
