"use client";

import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cn } from "@/6.shared/lib";
import { FileText, Award } from "lucide-react";
import {
  quizQueries,
  LectureForQuiz,
  LectureQuiz,
  FilterType,
  FILTER_TYPE,
  STATUS,
  FILTER_COLOR_MAP,
  FILTER_LABELS,
  getLatestSubmit,
  QuizCard,
} from "@/5.entities/quiz";
import { FilterTab } from "./FilterTab";

interface QuizListPanelProps {
  selectedLecture: LectureForQuiz;
}

const QuizListPanel = ({ selectedLecture }: QuizListPanelProps) => {
  const [filterType, setFilterType] = useState<FilterType>(FILTER_TYPE.전체);

  const { data: courseQuizzes } = useSuspenseQuery(
    quizQueries.myQuizzes(selectedLecture.courseId)
  );

  const lecture = courseQuizzes.lectures.find(
    (l) => l.lectureId === selectedLecture.lectureId
  );

  const quizzes = useMemo(
    () => (lecture?.quizzes ?? []) as LectureQuiz[],
    [lecture?.quizzes]
  );

  // 필터별 카운트 계산 (가장 최근 제출 기준)
  const counts = useMemo(() => {
    const correct = quizzes.filter((q) => {
      const latestSubmit = getLatestSubmit(q.quizSubmits);
      return latestSubmit?.status === STATUS.정답;
    }).length;
    const incorrect = quizzes.filter((q) => {
      const latestSubmit = getLatestSubmit(q.quizSubmits);
      return latestSubmit?.status === STATUS.오답;
    }).length;
    const feedback = quizzes.filter((q) => {
      const latestSubmit = getLatestSubmit(q.quizSubmits);
      return latestSubmit?.feedbackComment;
    }).length;

    return {
      [FILTER_TYPE.전체]: quizzes.length,
      [FILTER_TYPE.정답]: correct,
      [FILTER_TYPE.오답]: incorrect,
      [FILTER_TYPE.피드백]: feedback,
    };
  }, [quizzes]);

  // 퀴즈 필터링 (가장 최근 제출 기준)
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const latestSubmit = getLatestSubmit(quiz.quizSubmits);
      if (!latestSubmit) return filterType === FILTER_TYPE.전체;

      if (filterType === FILTER_TYPE.전체) return true;
      if (filterType === FILTER_TYPE.정답)
        return latestSubmit.status === STATUS.정답;
      if (filterType === FILTER_TYPE.오답)
        return latestSubmit.status === STATUS.오답;
      if (filterType === FILTER_TYPE.피드백)
        return Boolean(latestSubmit.feedbackComment);
      return true;
    });
  }, [quizzes, filterType]);

  // lecture가 없으면 빈 상태 표시
  if (!lecture) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FileText className="w-12 h-12 mb-3 opacity-50" />
        <p>퀴즈 데이터를 찾을 수 없습니다</p>
      </div>
    );
  }

  const correctRate =
    selectedLecture.submittedQuizCount > 0
      ? Math.round(
          (selectedLecture.correctQuizCount /
            selectedLecture.submittedQuizCount) *
            100
        )
      : 0;

  return (
    <div className="flex flex-col">
      {/* 강의 헤더 */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="px-6 py-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {selectedLecture.lectureTitle}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  정답률 {correctRate}%
                </span>
                <span>
                  {selectedLecture.correctQuizCount}/
                  {selectedLecture.submittedQuizCount}문제
                </span>
              </div>
            </div>
            {/* 정답률 링 */}
            <div
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-full text-lg font-bold",
                correctRate >= 80
                  ? "bg-green-100 text-green-600"
                  : correctRate >= 50
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              )}
            >
              {correctRate}%
            </div>
          </div>

          {/* 필터 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {Object.values(FILTER_TYPE).map((type) => (
              <FilterTab
                key={type}
                active={filterType === type}
                onClick={() => setFilterType(type)}
                count={counts[type]}
                color={FILTER_COLOR_MAP[type]}
              >
                {FILTER_LABELS[type]}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      {/* 퀴즈 목록 */}
      <div className="p-6 bg-gray-50/50 min-h-[400px]">
        {filteredQuizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FileText className="w-10 h-10 mb-3 opacity-50" />
            <p>해당 조건의 퀴즈가 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.quizId} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { QuizListPanel };
export type { QuizListPanelProps };
