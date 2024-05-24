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
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface DashboardProps {
  data: CourseDetail;
}

export default function CourseCardDashboard({ data }: DashboardProps) {
  const router = useRouter();

  return (
    <div className="md:w-full h-full">
      <Card className="h-full flex w-full flex-col justify-between shadow-xl rounded-2xl max-w-md md:max-w-lg flex-grow">
        <CardHeader>
          <CardTitle className="whitespace-normal break-words text-sm md:text-base lg:text-lg">
            {data.title}
          </CardTitle>
          <CardDescription>{data.curriculum}</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.thumbnailPath}`}
              fill
              className="rounded-md object-contain"
              alt="Thumbnail"
              priority
            />
          </AspectRatio>
          {/* <div className="mt-2 text-xs md:text-sm lg:text-lg">{data.title}</div> */}

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
            disabled={data.status === "inactive"}
            onClick={() => {
              router.push(
                `/course/${data.courseId}/lecture/${data.lastStudyLectureId}`
              );
            }}
          >
            {data.status === "active" ? "이어보기" : "강의마감"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
