import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

type Lecture = {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile: string | null; // Assuming it can be null since other examples have it as null
  status: "active"; // This can be expanded if there are more statuses
  createdAt: string;
  updatedAt: string;
  quizzes: any[]; // Define more specifically if you have a structure for quizzes
  lectureTimeRecords: any[]; // Define more specifically if you have a structure for lectureTimeRecords
};

export default function LectureList({ lectures }: Lecture) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {lectures?.map((ele: Lecture, index: number) => (
        <AccordionItem
          key={ele.lectureId}
          value={`item-${index}`}
          className="bg-blue-100 border border-blue-300 rounded-md mt-3"
        >
          <AccordionTrigger className="mx-4 text-xl ">
            {ele.lectureNumber}강 {ele.title}
          </AccordionTrigger>

          <AccordionContent className="flex items-center p-2 bg-white">
            <FaCirclePlay className="mr-2" size={16} />
            <Link href={`/course/${ele.courseId}/lecture/${ele.lectureId}`}>
              강의 들으러 가기
            </Link>
          </AccordionContent>

          <AccordionContent className="flex items-center p-2 bg-white">
            <MdOutlineQuiz className="mr-2" size={16} />
            <p>1강 퀴즈</p>
          </AccordionContent>

          <AccordionContent className="flex items-center p-2 bg-white">
            <MdOutlineQuiz className="mr-2" size={16} />
            <p>1강 퀴즈</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
