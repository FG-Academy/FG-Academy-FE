import { defaultTo } from "es-toolkit/compat";
import { Progress, Typography } from "@/6.shared/ui";
import { CourseEnrollment } from "@/5.entities/enrollment";

type Props = {
  enrollment: CourseEnrollment;
  children: React.ReactNode;
};

export function EnrollmentProgress({ enrollment, children }: Props) {
  const progressValue = defaultTo(
    Math.floor((enrollment.completedLectures / enrollment.totalCount) * 100),
    0
  );

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Typography name="h3" className="text-center">
        강의 진행
      </Typography>
      <Typography name="body2" className="m-0 text-center">
        진도율: {enrollment.completedLectures}강/{enrollment.totalCount}강 (
        {progressValue}%)
      </Typography>

      <Progress
        indicatorColor="bg-blue-400"
        className="border-gray-400 shadow-md border-1"
        value={progressValue}
      />
      {children}
    </div>
  );
}
