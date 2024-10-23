import LectureHeader from "./components/LectureHeader";
import LectureNav from "./components/LectureNav";
import { auth } from "@/auth";

type Props = {
  params: { courseId: string; lectureId: string };
  children: React.ReactNode;
};
export default async function LectureLayout({ children, params }: Props) {
  // const { courseId, lectureId } = params;
  const courseId = parseInt(params.courseId);
  const lectureId = parseInt(params.lectureId);

  const session = await auth();
  const accessToken = session?.user.accessToken as string;

  return (
    <div id="container" className="flex flex-row w-screen h-screen">
      <div id="main-content" className="flex flex-1 flex-col w-full h-full">
        <LectureHeader courseId={courseId} lectureId={lectureId} />
        {children}
      </div>
      <LectureNav courseId={courseId} lectureId={lectureId} />
    </div>
  );
}
