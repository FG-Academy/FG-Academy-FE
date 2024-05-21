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
import { useRouter } from "next/navigation";
import { CourseDetail } from "../hooks/useDashboard";

interface DashboardProps {
  data: CourseDetail;
}

export default function CourseCardDashboard({ data }: DashboardProps) {
  const router = useRouter();

  return (
    <div className="md:w-full h-full">
      <Card className="h-full flex flex-col justify-betweenshadow-xl rounded-2xl max-w-md md:max-w-lg flex-grow">
        <CardHeader>
          <CardTitle className="text-sm md:text-base lg:text-lg">
            {data.title}
          </CardTitle>
          <CardDescription>{data.curriculum}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.thumbnailPath}`}
            width={200}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="Thumbnail"
            priority
          />
          <div className="mt-2 text-xs md:text-sm lg:text-lg">{data.title}</div>

          <Progress
            className="w-full mt-2"
            value={Math.floor(
              (data.completedLectures / data.totalCourseLength) * 100
            )}
            indicatorColor="bg-blue-400"
          />
          <div className="mt-1 text-xs md:text-sm">
            {data.completedLectures}/{data.totalCourseLength}
          </div>
          <div className="mt-1 text-xs md:text-sm text-blue-500">
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
