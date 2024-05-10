import LectureVideo from "./components/LectureVideo";

type Props = {
  params: { lectureId: string; courseId: string };
};

export default async function Page({ params }: Props) {
  // const { lectureId, courseId } = params;
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  return <LectureVideo courseId={courseId} lectureId={lectureId} />;
}
