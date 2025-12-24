import { LecturePage } from "@/2.pages/lecture";

type Props = {
  params: { lectureId: string; courseId: string };
};

export default async function Page({ params }: Props) {
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  return <LecturePage courseId={courseId} lectureId={lectureId} />;
}
