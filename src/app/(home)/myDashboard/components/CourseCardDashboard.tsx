import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { courseDetail } from "@/model/dashboard";
import { useRouter } from "next/navigation";

interface DashboardProps {
  data: courseDetail;
}

export default function CourseCardDashboard({ data }: DashboardProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <Card className="h-full flex flex-col justify-between flex-shrink-0 shadow-xl rounded-2xl max-w-xs md:max-w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">{data.title}</CardTitle>
          <CardDescription>{data.curriculum}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-1"></div>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.thumbnailPath}`}
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
            alt="Thumbnail"
            priority
          />
          <div className="mt-2 text-sm">{data.title}</div>

          <Progress
            className="w-full mt-2"
            value={Math.floor(
              (data.completedLectures / data.totalCourseLength) * 100
            )}
            indicatorColor="bg-blue-400"
          />
          <div className="mt-1 text-sm">
            {data.completedLectures}/{data.totalCourseLength}
          </div>
          <div className="mt-1 text-sm text-blue-500">
            {data.totalCourseLength === 0
              ? 0
              : Math.floor(
                  (data.completedLectures / data.totalCourseLength) * 100
                )}
            % 완료
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              router.push(
                `/course/${data.courseId}/lecture/${data.lastStudyLectureId}`
              );
            }}
          >
            이어보기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
