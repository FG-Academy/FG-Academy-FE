"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Progress,
  Separator,
  Spinner,
  Typography,
} from "@/6.shared/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { quizQueries } from "../api/quiz.queries";
import {
  Award,
  BarChart3,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  Filter,
  MessageCircle,
  XCircle,
} from "lucide-react";
import {
  CourseForQuiz,
  LectureForQuiz,
  LectureQuiz,
  QUIZ_TYPE,
  STATUS,
} from "../model/quiz.type";
import { Suspense, useState } from "react";

const MyQuizList = () => {
  const { data: courses } = useSuspenseQuery(quizQueries.coursesForQuiz());

  const [selectedLecture, setSelectedLecture] = useState<LectureForQuiz>(
    courses[0].lectures[0]
  );

  const handleLectureClick = (lectureId: number) => {
    setSelectedLecture(
      courses
        .map((c) => c.lectures.find((l) => l.lectureId === lectureId))
        .find(Boolean) as LectureForQuiz
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 p-6">
        <Typography name="h3">퀴즈 피드백</Typography>
        <Typography name="body2">
          내가 제출한 퀴즈와 채점 현황을 확인해보세요
        </Typography>
      </div>

      <Separator />

      <div className="flex w-full">
        <section className="flex flex-col gap-4 w-80 p-4 border-r overflow-auto">
          <div className="flex justify-between items-center">
            <Typography name="h4">내 강의 목록</Typography>
            <Typography name="muted">{courses.length}개 강의</Typography>
          </div>
          <div className="flex flex-col gap-2">
            {courses.map((course) => (
              <CourseItem
                key={course.courseId}
                course={course}
                selectedLecture={selectedLecture}
                handleLectureClick={handleLectureClick}
              />
            ))}
          </div>
        </section>
        <section className="flex-1 overflow-y-auto">
          {selectedLecture && (
            <Suspense fallback={<Spinner />}>
              <QuizList selectedLecture={selectedLecture} />
            </Suspense>
          )}
        </section>
      </div>
    </div>
  );
};

interface QuizListProps {
  selectedLecture: LectureForQuiz;
}
const QuizList = ({ selectedLecture }: QuizListProps) => {
  console.log(selectedLecture);
  const [filterType, setFilterType] = useState<
    "all" | "correct" | "incorrect" | "feedback"
  >("all");

  const { data: courseQuizzes } = useSuspenseQuery(
    quizQueries.myQuizzes(selectedLecture.courseId)
  );

  const lectures = courseQuizzes.lectures.find(
    (l) => l.lectureId === selectedLecture.lectureId
  );

  if (!lectures) return null;

  const quizzes = lectures?.quizzes as LectureQuiz[];

  const filteredQuizzes = quizzes?.filter((quiz) => {
    if (filterType === "all") return true;
    if (filterType === "correct")
      return quiz.quizSubmits.some((submit) => submit.status === STATUS.정답);
    if (filterType === "incorrect")
      return quiz.quizSubmits.some((submit) => submit.status === STATUS.오답);
    if (filterType === "feedback")
      return quiz.quizSubmits.some((submit) => Boolean(submit.feedbackComment));
  });

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div>
          <Typography name="h4" className="mb-2">
            {selectedLecture.lectureTitle}
          </Typography>
        </div>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-1" />
            <span>
              점수:{" "}
              <span className="font-semibold text-gray-900">
                {selectedLecture.correctQuizCount}/
                {selectedLecture.correctQuizCount}
              </span>
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2 border-t pt-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filterType === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            전체 ({quizzes.length})
          </button>
          <button
            onClick={() => setFilterType("correct")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filterType === "correct"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            정답 (
            {
              quizzes.filter((q) =>
                q.quizSubmits.some((s) => s.status === STATUS.정답)
              ).length
            }
            )
          </button>
          <button
            onClick={() => setFilterType("incorrect")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filterType === "incorrect"
                ? "bg-red-100 text-red-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            오답 (
            {
              quizzes.filter((q) =>
                q.quizSubmits.some((s) => s.status === STATUS.오답)
              ).length
            }
            )
          </button>
          <button
            onClick={() => setFilterType("feedback")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filterType === "feedback"
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            피드백 (
            {
              quizzes.filter((q) =>
                q.quizSubmits.some((s) => s.feedbackComment)
              ).length
            }
            )
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredQuizzes.map((quiz, index) => (
          <div
            key={quiz.quizId}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            {/* 문제 헤더 */}
            <div className="bg-gray-50 px-6 py-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">
                    Q{quiz.quizIndex}.
                  </span>
                  {quiz.quizType === "multiple" ? (
                    <span className="flex items-center text-sm text-blue-600">
                      <Circle className="w-4 h-4 mr-1" />
                      객관식
                    </span>
                  ) : (
                    <span className="flex items-center text-sm text-purple-600">
                      <FileText className="w-4 h-4 mr-1" />
                      주관식
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {quiz.quizSubmits.some((qs) => qs.status === STATUS.정답) ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">정답</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">오답</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 문제 내용 */}
            <div className="p-6">
              <p className="text-gray-900 font-medium mb-4">{quiz.question}</p>

              {quiz.quizType === QUIZ_TYPE.객관식 ? (
                // 객관식 문제
                <div className="space-y-2">
                  {quiz.quizAnswers.map((quizAnswer, quizAnswerIndex) => {
                    const isUserAnswer =
                      JSON.parse(quiz.quizSubmits[0].answer)[0] ===
                      quizAnswerIndex;
                    const isCorrectAnswer =
                      quiz.quizAnswers[0].itemIndex === quizAnswerIndex;

                    return (
                      <div
                        key={quizAnswer.id}
                        className={`flex items-center p-3 rounded-lg border ${
                          isCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : isUserAnswer && !isCorrectAnswer
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            isCorrectAnswer
                              ? "border-green-500"
                              : isUserAnswer
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          {(isUserAnswer || isCorrectAnswer) && (
                            <div
                              className={`w-3 h-3 rounded-full ${
                                isCorrectAnswer ? "bg-green-500" : "bg-red-500"
                              }`}
                            />
                          )}
                        </div>
                        <span
                          className={`flex-1 ${
                            isCorrectAnswer
                              ? "text-green-700 font-medium"
                              : isUserAnswer
                              ? "text-red-700"
                              : "text-gray-700"
                          }`}
                        >
                          {quizAnswerIndex + 1}. {quizAnswer.item}
                        </span>
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="text-xs text-red-600 font-medium">
                            내가 선택
                          </span>
                        )}
                        {isCorrectAnswer && (
                          <span className="text-xs text-green-600 font-medium">
                            정답
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                // 주관식 문제
                <div className="space-y-4">
                  {/* 나의 답안 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      나의 답안:
                    </h4>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-gray-800">
                        {quiz.quizSubmits[0].answer}
                      </p>
                    </div>
                  </div>

                  {/* 모범 답안 */}
                  {/* <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      모범 답안:
                    </h4>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-gray-800">{quiz.modelAnswer}</p>
                    </div>
                  </div> */}

                  {/* 강사 피드백 */}
                  {quiz.quizSubmits[0].feedbackComment && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1 text-purple-600" />
                        강사 피드백:
                      </h4>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-gray-800">
                          {quiz.quizSubmits[0].feedbackComment}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CourseItemProps {
  course: CourseForQuiz;
  handleLectureClick: (lectureId: number) => void;
  selectedLecture: LectureForQuiz | null;
}
const CourseItem = ({
  course,
  handleLectureClick,
  selectedLecture,
}: CourseItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isSelectedLectureInCourse = course.lectures.some(
    (lecture) => lecture.lectureId === selectedLecture?.lectureId
  );

  return (
    <Collapsible
      defaultOpen={isSelectedLectureInCourse}
      onOpenChange={setIsOpen}
      className="flex flex-col p-4 gap-2 rounded-md border"
    >
      <div className="flex justify-between items-center">
        <Typography name="body2" className="mb-2 font-semibold">
          {course.courseTitle}
        </Typography>
        <CollapsibleTrigger>
          {isOpen ? (
            <ChevronDown size={16} className="text-gray-300" />
          ) : (
            <ChevronRight size={16} className="text-gray-300" />
          )}
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <FileText className="w-4 h-4 mr-1" />
        <Typography name="body3">
          {course.completedNumber}/{course.lectureCount}강
        </Typography>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Award className="w-4 h-4 mr-1" />
        <Typography name="body3">
          평균 정답률: {course.averageCorrectRatio * 100}%
        </Typography>
      </div>
      <Progress
        indicatorColor="bg-primary-blue"
        className="h-2"
        value={(course.completedNumber / course.lectureCount) * 100}
      />
      <CollapsibleContent>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2">
          {course.lectures.map((lecture) => (
            <div
              tabIndex={0}
              key={lecture.lectureId}
              className={`px-3 py-2 rounded text-sm cursor-pointer transition-all ${
                selectedLecture?.lectureId === lecture.lectureId
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLectureClick(lecture.lectureId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleLectureClick(lecture.lectureId);
                }
              }}
            >
              <Typography name="body3" className="font-medium">
                {lecture.lectureTitle}
              </Typography>
              <Typography name="body4">
                정답률: {lecture.correctQuizCount}/{lecture.submittedQuizCount}
              </Typography>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export { MyQuizList };
