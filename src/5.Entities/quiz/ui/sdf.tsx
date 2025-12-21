import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  FileText,
  Circle,
  Clock,
  Award,
  BarChart3,
  Filter,
} from "lucide-react";

const QuizHistoryDashboard = () => {
  const [selectedLecture, setSelectedLecture] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(1);
  const [expandedLectures, setExpandedLectures] = useState([1]);
  const [filterType, setFilterType] = useState("all"); // all, correct, incorrect, feedback

  // 샘플 데이터
  const lectures = [
    {
      id: 1,
      title: "React 기초 과정",
      totalQuizzes: 5,
      completedQuizzes: 4,
      averageScore: 85,
      quizzes: [
        {
          id: 1,
          title: "컴포넌트 이해하기",
          score: 90,
          totalScore: 100,
          date: "2024-01-15",
          hasFeedback: true,
          status: "completed",
        },
        {
          id: 2,
          title: "State와 Props",
          score: 80,
          totalScore: 100,
          date: "2024-01-16",
          hasFeedback: false,
          status: "completed",
        },
        {
          id: 3,
          title: "Hooks 활용",
          score: 85,
          totalScore: 100,
          date: "2024-01-17",
          hasFeedback: true,
          status: "completed",
        },
        {
          id: 4,
          title: "라이프사이클",
          score: 88,
          totalScore: 100,
          date: "2024-01-18",
          hasFeedback: false,
          status: "completed",
        },
      ],
    },
    {
      id: 2,
      title: "JavaScript 심화",
      totalQuizzes: 3,
      completedQuizzes: 3,
      averageScore: 92,
      quizzes: [
        {
          id: 5,
          title: "비동기 프로그래밍",
          score: 95,
          totalScore: 100,
          date: "2024-01-10",
          hasFeedback: true,
          status: "completed",
        },
        {
          id: 6,
          title: "클로저와 스코프",
          score: 90,
          totalScore: 100,
          date: "2024-01-11",
          hasFeedback: false,
          status: "completed",
        },
        {
          id: 7,
          title: "프로토타입",
          score: 91,
          totalScore: 100,
          date: "2024-01-12",
          hasFeedback: true,
          status: "completed",
        },
      ],
    },
    {
      id: 3,
      title: "TypeScript 입문",
      totalQuizzes: 4,
      completedQuizzes: 2,
      averageScore: 78,
      quizzes: [
        {
          id: 8,
          title: "타입 기초",
          score: 82,
          totalScore: 100,
          date: "2024-01-20",
          hasFeedback: false,
          status: "completed",
        },
        {
          id: 9,
          title: "인터페이스",
          score: 75,
          totalScore: 100,
          date: "2024-01-21",
          hasFeedback: true,
          status: "completed",
        },
      ],
    },
  ];

  // 퀴즈 상세 데이터
  const quizDetails = {
    1: {
      title: "컴포넌트 이해하기",
      submittedAt: "2024-01-15 14:30",
      score: 90,
      totalScore: 100,
      questions: [
        {
          id: 1,
          type: "multiple",
          question: "React 컴포넌트를 정의하는 올바른 방법은?",
          options: [
            "function Component[] {}",
            "function Component() {}",
            "component Function() {}",
            "Function Component() {}",
          ],
          userAnswer: 1,
          correctAnswer: 1,
          isCorrect: true,
        },
        {
          id: 2,
          type: "multiple",
          question: "JSX에서 JavaScript 표현식을 사용하는 방법은?",
          options: [
            "{{ expression }}",
            "{ expression }",
            "[ expression ]",
            "( expression )",
          ],
          userAnswer: 0,
          correctAnswer: 1,
          isCorrect: false,
        },
        {
          id: 3,
          type: "essay",
          question: "React에서 상태 관리가 필요한 이유를 설명하시오.",
          userAnswer:
            "React에서 상태 관리는 컴포넌트의 동적인 데이터를 관리하고, 사용자 인터랙션에 따라 UI를 업데이트하기 위해 필요합니다. 상태가 변경되면 React는 자동으로 컴포넌트를 리렌더링하여 최신 상태를 반영합니다.",
          modelAnswer:
            "React에서 상태 관리는 1) 컴포넌트의 동적 데이터 저장, 2) 사용자 인터랙션에 대한 반응, 3) 시간에 따른 데이터 변화 추적, 4) 컴포넌트 간 데이터 공유를 위해 필수적입니다. 상태 변경 시 React의 재조정(Reconciliation) 과정을 통해 효율적인 DOM 업데이트가 이루어집니다.",
          feedback:
            "좋은 답변입니다! 추가로 상태 관리가 React의 재조정 과정과 어떻게 연결되는지, 그리고 컴포넌트 간 데이터 공유 측면도 언급하시면 더 완벽한 답변이 될 것 같습니다.",
          score: 18,
          maxScore: 20,
          isCorrect: true,
        },
        {
          id: 4,
          type: "essay",
          question: "Props와 State의 차이점을 설명하시오.",
          userAnswer:
            "Props는 부모 컴포넌트로부터 전달받는 읽기 전용 데이터이고, State는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.",
          modelAnswer:
            "Props는 부모 컴포넌트로부터 전달받는 읽기 전용(immutable) 데이터로, 컴포넌트 외부에서 제어됩니다. State는 컴포넌트 내부에서 선언되고 관리되는 변경 가능한(mutable) 데이터로, setState나 useState를 통해 업데이트할 수 있습니다. Props는 단방향 데이터 흐름을 보장하고, State는 컴포넌트의 지역적인 상태를 관리합니다.",
          feedback:
            "핵심을 잘 파악하셨습니다. 단방향 데이터 흐름과 불변성(immutability)의 개념을 추가로 설명하시면 더 깊이 있는 답변이 될 것입니다.",
          score: 17,
          maxScore: 20,
          isCorrect: true,
        },
      ],
    },
  };

  const toggleLecture = (lectureId) => {
    setExpandedLectures((prev) =>
      prev.includes(lectureId)
        ? prev.filter((id) => id !== lectureId)
        : [...prev, lectureId]
    );
  };

  const currentQuizDetail = quizDetails[selectedQuiz] || quizDetails[1];
  const selectedLectureData = lectures.find((l) => l.id === selectedLecture);

  // 필터링 로직
  const getFilteredQuestions = () => {
    if (!currentQuizDetail) return [];

    switch (filterType) {
      case "correct":
        return currentQuizDetail.questions.filter((q) => q.isCorrect);
      case "incorrect":
        return currentQuizDetail.questions.filter((q) => !q.isCorrect);
      case "feedback":
        return currentQuizDetail.questions.filter(
          (q) => q.type === "essay" && q.feedback
        );
      default:
        return currentQuizDetail.questions;
    }
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            나의 퀴즈 제출 내역
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            강의별 퀴즈 결과와 피드백을 확인하세요
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* 좌측 사이드바 - 강의 목록 */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">강의 목록</h2>
              <span className="text-sm text-gray-500">
                {lectures.length}개 강의
              </span>
            </div>

            {lectures.map((lecture) => (
              <div key={lecture.id} className="mb-3">
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedLecture === lecture.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedLecture(lecture.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {lecture.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="w-4 h-4 mr-1" />
                          <span>
                            {lecture.completedQuizzes}/{lecture.totalQuizzes}{" "}
                            완료
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="w-4 h-4 mr-1" />
                          <span>평균 {lecture.averageScore}점</span>
                        </div>
                      </div>

                      {/* 진도율 바 */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{
                              width: `${
                                (lecture.completedQuizzes /
                                  lecture.totalQuizzes) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLecture(lecture.id);
                      }}
                      className="ml-2 p-1"
                    >
                      {expandedLectures.includes(lecture.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* 퀴즈 목록 */}
                  {expandedLectures.includes(lecture.id) && (
                    <div className="mt-3 space-y-2 border-t pt-3">
                      {lecture.quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuiz(quiz.id);
                          }}
                          className={`px-3 py-2 rounded text-sm cursor-pointer transition-all ${
                            selectedQuiz === quiz.id
                              ? "bg-blue-100 text-blue-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{quiz.title}</span>
                            {quiz.hasFeedback && (
                              <MessageCircle className="w-4 h-4 text-purple-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                            <span>{quiz.date}</span>
                            <span
                              className={`font-medium ${
                                quiz.score >= 90
                                  ? "text-green-600"
                                  : quiz.score >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {quiz.score}점
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 메인 영역 - 퀴즈 상세 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* 퀴즈 기본 정보 헤더 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {currentQuizDetail.title}
                  </h2>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>제출: {currentQuizDetail.submittedAt}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      <span>
                        점수:{" "}
                        <span className="font-semibold text-gray-900">
                          {currentQuizDetail.score}/
                          {currentQuizDetail.totalScore}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentQuizDetail.score >= 90
                        ? "bg-green-100 text-green-700"
                        : currentQuizDetail.score >= 70
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {currentQuizDetail.score >= 90
                      ? "우수"
                      : currentQuizDetail.score >= 70
                      ? "보통"
                      : "노력필요"}
                  </span>
                  {currentQuizDetail.questions.some((q) => q.feedback) && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      피드백 있음
                    </span>
                  )}
                </div>
              </div>

              {/* 필터 옵션 */}
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
                  전체 ({currentQuizDetail.questions.length})
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
                    currentQuizDetail.questions.filter((q) => q.isCorrect)
                      .length
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
                    currentQuizDetail.questions.filter((q) => !q.isCorrect)
                      .length
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
                  {currentQuizDetail.questions.filter((q) => q.feedback).length}
                  )
                </button>
              </div>
            </div>

            {/* 문제별 상세 내역 */}
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  {/* 문제 헤더 */}
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          Q{question.id}.
                        </span>
                        {question.type === "multiple" ? (
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
                        {question.isCorrect ? (
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
                        {question.type === "essay" && (
                          <span className="text-sm text-gray-600">
                            {question.score}/{question.maxScore}점
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 문제 내용 */}
                  <div className="p-6">
                    <p className="text-gray-900 font-medium mb-4">
                      {question.question}
                    </p>

                    {question.type === "multiple" ? (
                      // 객관식 문제
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer =
                            question.userAnswer === optionIndex;
                          const isCorrectAnswer =
                            question.correctAnswer === optionIndex;

                          return (
                            <div
                              key={optionIndex}
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
                                      isCorrectAnswer
                                        ? "bg-green-500"
                                        : "bg-red-500"
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
                                {optionIndex + 1}. {option}
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
                              {question.userAnswer}
                            </p>
                          </div>
                        </div>

                        {/* 모범 답안 */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            모범 답안:
                          </h4>
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-gray-800">
                              {question.modelAnswer}
                            </p>
                          </div>
                        </div>

                        {/* 강사 피드백 */}
                        {question.feedback && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1 text-purple-600" />
                              강사 피드백:
                            </h4>
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                              <p className="text-gray-800">
                                {question.feedback}
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

            {/* 요약 통계 */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                퀴즈 요약
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentQuizDetail.questions.length}
                  </div>
                  <div className="text-sm text-gray-600">전체 문제</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      currentQuizDetail.questions.filter((q) => q.isCorrect)
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">정답</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      currentQuizDetail.questions.filter((q) => !q.isCorrect)
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">오답</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentQuizDetail.score}%
                  </div>
                  <div className="text-sm text-gray-600">정답률</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryDashboard;
