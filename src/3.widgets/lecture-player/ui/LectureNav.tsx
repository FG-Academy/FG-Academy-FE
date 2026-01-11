"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/6.shared/ui/shadcn/ui/LectureAccordion";
import { formatDate } from "@/6.shared/lib";
import { Progress, toast } from "@/6.shared/ui";
import {
  MessageCircleQuestion,
  PlayCircle,
  X,
  CheckCircle2,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { enrollmentQueries } from "@/5.entities/enrollment";
import type {
  LectureProgressResult,
  MyCourseDetail,
  MyCourseLecture,
  MyCourseLectureQuiz,
} from "@/5.entities/enrollment";
import { cn } from "@/6.shared/lib";
import { useLectureNav } from "../model/use-lecture-nav";
import {
  canAccessLecture,
  getQuizAccess,
  getQuizAccessDeniedMessage,
  calcProgressPercent,
  isLectureCompleted,
} from "../model/lecture-access";

interface LectureNavProps {
  courseId: number;
  lectureId: number;
}

function MobileToggleButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="absolute z-50 p-2 text-white transition-colors border rounded-lg shadow-lg right-4 top-20 bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 border-zinc-700"
    >
      <Menu className="w-5 h-5" />
      <span className="sr-only">커리큘럼 열기</span>
    </button>
  );
}

interface NavHeaderProps {
  title: string;
  completedCount: number;
  totalLectures: number;
  finishDate: string;
  onClose: () => void;
}

function NavHeader({
  title,
  completedCount,
  totalLectures,
  finishDate,
  onClose,
}: NavHeaderProps) {
  const progressPercent = calcProgressPercent(completedCount, totalLectures);

  return (
    <div
      id="nav-header"
      className="flex flex-col p-6 space-y-6 bg-white border-b shrink-0 border-zinc-100"
    >
      <div className="flex flex-row items-start justify-between gap-4">
        <h2 className="text-lg font-bold leading-tight text-zinc-900">
          {title.replace(/\(\d+\)\s*/, "")}
        </h2>
        <button
          onClick={onClose}
          className="p-1 transition-colors rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs font-medium text-zinc-500">
          <span>진도율</span>
          <span>{progressPercent}%</span>
        </div>
        <Progress
          value={progressPercent}
          className="h-2 bg-zinc-100"
          indicatorColor="bg-emerald-500"
        />
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            {completedCount} / {totalLectures} 강의
          </span>
          <span>~ {formatDate(new Date(finishDate))}</span>
        </div>
      </div>
    </div>
  );
}

interface QuizLinkProps {
  courseId: number;
  lecture: MyCourseLecture;
  quiz: MyCourseLectureQuiz;
  quizIndex: number;
  isCurrentQuiz: boolean;
  userLevel: string | undefined;
  progress: LectureProgressResult;
}

function QuizLink({
  courseId,
  lecture,
  quiz,
  quizIndex,
  isCurrentQuiz,
  userLevel,
  progress,
}: QuizLinkProps) {
  const quizPath = quiz.quizType === "multiple" ? "multiple" : "descriptive";
  const quizLabel =
    quiz.quizType === "multiple" ? "객관식 퀴즈" : "주관식 퀴즈";

  const handleClick = (e: React.MouseEvent) => {
    const access = getQuizAccess({
      lecture,
      quizIndex,
      userLevel,
      progress,
    });

    if (!access.allowed) {
      e.preventDefault();
      toast({
        title: getQuizAccessDeniedMessage(access.reason),
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <Link
      href={`/course/${courseId}/lecture/${lecture.lectureId}/${quizPath}?quizId=${quiz.quizId}`}
      className={cn(
        "relative flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-2",
        isCurrentQuiz
          ? "bg-blue-50/50 text-blue-600 border-blue-600 font-medium"
          : "text-zinc-600 border-transparent hover:bg-zinc-100 hover:text-zinc-900"
      )}
      onClick={handleClick}
    >
      {quiz.submitted ? (
        <CheckCircle2 size={16} fill="#10b981" className="text-white" />
      ) : (
        <MessageCircleQuestion size={16} className="shrink-0" />
      )}
      <span className="truncate">
        {quizLabel}
        <span className="ml-1 text-xs font-normal text-zinc-400">
          #{quizIndex + 1}
        </span>
      </span>
    </Link>
  );
}

interface LectureItemProps {
  courseId: number;
  lecture: MyCourseLecture;
  lectureIndex: number;
  currentLectureId: number;
  currentQuizId: number;
  pathname: string;
  userLevel: string | undefined;
  progress: LectureProgressResult;
  sidebar: MyCourseDetail;
}

function LectureItem({
  courseId,
  lecture,
  lectureIndex,
  currentLectureId,
  currentQuizId,
  pathname,
  userLevel,
  progress,
  sidebar,
}: LectureItemProps) {
  const isClickable = canAccessLecture({
    lecture,
    lectureIndex,
    categoryName: sidebar.category.name,
    userLevel,
    progress,
    lectures: sidebar.lectures,
  });

  const isCompleted = isLectureCompleted(lecture.lectureId, progress);

  const isCurrentLecture =
    currentLectureId === lecture.lectureId &&
    !(pathname.includes("multiple") || pathname.includes("descriptive"));

  return (
    <AccordionItem
      disabled={!isClickable}
      value={lecture.lectureNumber.toString()}
      className="border-b border-zinc-100 last:border-none"
    >
      <AccordionTrigger
        className={cn(
          "px-6 py-4 text-left hover:no-underline bg-zinc-100 hover:bg-zinc-200/50 transition-colors border-b-[1px] border-zinc-200",
          !isClickable && "opacity-50 cursor-not-allowed bg-zinc-50/50"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex items-center justify-center w-6 h-6 text-xs font-extrabold rounded-full",
              isCompleted
                ? "bg-emerald-100 text-emerald-600"
                : "bg-zinc-100 text-zinc-500"
            )}
          >
            {lecture.lectureNumber}
          </span>
          <span className="text-sm font-medium text-zinc-500 line-clamp-1">
            {lecture.lectureTitle}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="bg-zinc-50/50">
        <div className="flex flex-col py-1">
          <Link
            href={`/course/${courseId}/lecture/${lecture.lectureId}`}
            className={cn(
              "relative flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-2",
              isCurrentLecture
                ? "bg-blue-50/50 text-blue-600 border-blue-600 font-medium"
                : "text-zinc-600 border-transparent hover:bg-zinc-100 hover:text-zinc-900"
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <PlayCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="truncate">강의 영상</span>
          </Link>

          {lecture.quizzes.map((quiz, quizIdx) => {
            const isCurrentQuiz =
              (quiz.quizType === "multiple" && currentQuizId === quiz.quizId) ||
              (currentQuizId === quiz.quizId &&
                pathname.includes("descriptive"));

            return (
              <QuizLink
                key={quiz.quizId}
                courseId={courseId}
                lecture={lecture}
                quiz={quiz}
                quizIndex={quizIdx}
                isCurrentQuiz={isCurrentQuiz}
                userLevel={userLevel}
                progress={progress}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function LectureNav({ courseId, lectureId }: LectureNavProps) {
  const { data: session } = useSession();
  const userLevel = session?.user.level;

  const searchParams = useSearchParams();
  const currentQuizId = parseInt(searchParams.get("quizId") as string);
  const pathname = usePathname();

  const { data: progress } = useSuspenseQuery(
    enrollmentQueries.lectureProgress(courseId)
  );
  const { data: sidebar } = useSuspenseQuery(
    enrollmentQueries.myCourseLectures(courseId)
  );

  const {
    isNavOpen,
    openAccordionItems,
    closeNav,
    openNav,
    setOpenAccordionItems,
  } = useLectureNav({ sidebar, lectureId });

  if (!isNavOpen) {
    return <MobileToggleButton onOpen={openNav} />;
  }

  return (
    <div className="relative z-30 flex h-full">
      <nav
        id="nav"
        className={cn(
          "flex flex-col w-screen md:w-[400px] h-full bg-white border-l border-zinc-200 shadow-xl md:shadow-none transition-all duration-300",
          !isNavOpen &&
            "translate-x-full md:translate-x-0 md:w-0 md:border-none md:overflow-hidden"
        )}
      >
        <NavHeader
          title={sidebar.title}
          completedCount={progress.completedCount}
          totalLectures={sidebar.lectures.length}
          finishDate={sidebar.finishDate}
          onClose={closeNav}
        />

        <div className="flex-1 overflow-y-auto">
          <Accordion
            className="flex flex-col w-full"
            type="multiple"
            value={openAccordionItems}
            onValueChange={setOpenAccordionItems}
          >
            {sidebar.lectures.map((lecture, index) => (
              <LectureItem
                key={lecture.lectureId}
                courseId={courseId}
                lecture={lecture}
                lectureIndex={index}
                currentLectureId={lectureId}
                currentQuizId={currentQuizId}
                pathname={pathname}
                userLevel={userLevel}
                progress={progress}
                sidebar={sidebar}
              />
            ))}
          </Accordion>
        </div>
      </nav>
    </div>
  );
}
