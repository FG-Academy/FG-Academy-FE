import { defaultTo } from "es-toolkit/compat";
import { Progress } from "@/6.shared/ui";
import { CourseEnrollment } from "@/5.entities/enrollment";
import { GraduationCap, TrendingUp } from "lucide-react";
import { cn } from "@/6.shared/lib";

type Props = {
  enrollment: CourseEnrollment;
  children: React.ReactNode;
};

export function EnrollmentProgress({ enrollment, children }: Props) {
  const progressValue = defaultTo(
    Math.floor((enrollment.completedLectures / enrollment.totalCount) * 100),
    0
  );

  const isCompleted = progressValue === 100;

  return (
    <div className="flex flex-col w-full">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl",
            isCompleted ? "bg-green-100" : "bg-primary-blue/10"
          )}
        >
          <GraduationCap
            className={cn(
              "w-5 h-5",
              isCompleted ? "text-green-600" : "text-primary-blue"
            )}
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">수강 현황</h3>
          <p className="text-xs text-gray-500">학습 진행률을 확인하세요</p>
        </div>
      </div>

      {/* 진행률 */}
      <div className="p-5 space-y-4">
        {/* 진행률 원형 표시 */}
        <div className="flex items-center justify-center py-4">
          <div
            className={cn(
              "relative flex items-center justify-center w-28 h-28 rounded-full",
              isCompleted
                ? "bg-gradient-to-br from-green-100 to-green-50"
                : "bg-gradient-to-br from-blue-100 to-blue-50"
            )}
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "text-3xl font-bold",
                  isCompleted ? "text-green-600" : "text-primary-blue"
                )}
              >
                {progressValue}%
              </span>
              <span className="text-xs text-gray-500">진도율</span>
            </div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="space-y-2">
          <Progress
            indicatorColor={isCompleted ? "bg-green-500" : "bg-primary-blue"}
            className="h-2.5 bg-gray-100"
            value={progressValue}
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              학습 진행
            </span>
            <span
              className={cn(
                "font-semibold",
                isCompleted ? "text-green-600" : "text-primary-blue"
              )}
            >
              {enrollment.completedLectures} / {enrollment.totalCount}강
            </span>
          </div>
        </div>

        {/* 완료 메시지 */}
        {isCompleted && (
          <div className="flex items-center justify-center gap-2 py-3 px-4 bg-green-50 rounded-xl text-green-700 text-sm font-medium">
            <GraduationCap className="w-4 h-4" />
            축하합니다! 모든 강의를 완료했습니다
          </div>
        )}

        {/* CTA 버튼 영역 */}
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}
